import type p5 from 'p5';

// Helper interface for the Hamiltonian Cycle object/structure used by Snake
export interface HamiltonianContext {
    cycle: HNode[]; // or any[] if we want to be loose, but HNode is better
    getNodeNo: (x: number, y: number) => number;
    getPossiblePositionsFrom: (x: number, y: number) => number[];
}

export class Snake {
    x: number;
    y: number;
    tailBlocks: p5.Vector[];
    velX: number;
    velY: number;
    apple: Apple;
    addCount: number;
    survivalMode: boolean;
    dead: boolean;
    path: HPath | null;
    weWin: boolean;
    lateGame: boolean;
    noMoreAStar: boolean;
    searchForLongestPathModeActive: boolean;
    controlledByPlayer: boolean;
    cycle: HNode[] | null;
    headCyclePosition: number;
    tailCyclePosition: number;
    appleCyclePosition: any;

    // Dependencies
    p: p5;
    blocksX: number;
    blocksY: number;
    blockSize: number;
    outlineLength: number;
    hc: HamiltonianContext | null; // Reference to the cycle logic

    constructor(p: p5, blocksX: number, blocksY: number, blockSize: number, outlineLength: number) {
        this.p = p;
        this.blocksX = blocksX;
        this.blocksY = blocksY;
        this.blockSize = blockSize;
        this.outlineLength = outlineLength;

        this.x = Math.floor(blocksX / 2);
        this.y = Math.floor(blocksY / 2);
        this.tailBlocks = [];
        this.tailBlocks.push(p.createVector(this.x - 3, this.y));
        this.tailBlocks.push(p.createVector(this.x - 2, this.y));
        this.tailBlocks.push(p.createVector(this.x - 1, this.y));
        this.velX = 1;
        this.velY = 0;
        this.apple = new Apple(this, p, blocksX, blocksY, blockSize, outlineLength);
        this.addCount = 0;
        this.survivalMode = this.dead = false;
        this.path = null;
        this.weWin = this.lateGame = this.noMoreAStar = this.searchForLongestPathModeActive = this.controlledByPlayer = false;
        this.cycle = null;
        this.headCyclePosition = 0;
        this.tailCyclePosition = 0;
        this.hc = null;
    }

    resetOnHamiltonian(hc: HamiltonianContext) {
        this.hc = hc;
        this.cycle = hc.cycle;
        const cycle = this.cycle;
        this.tailBlocks = [];
        this.tailBlocks.push(this.p.createVector(cycle[0].x, cycle[0].y));
        this.tailBlocks.push(this.p.createVector(cycle[1].x, cycle[1].y));
        this.tailBlocks.push(this.p.createVector(cycle[2].x, cycle[2].y));
        this.x = cycle[3].x;
        this.y = cycle[3].y;
        this.apple = new Apple(this, this.p, this.blocksX, this.blocksY, this.blockSize, this.outlineLength);
        this.headCyclePosition = 3;
        this.tailCyclePosition = 0;
    }

    show(colors: { primary: string, accent: string }) {
        const p = this.p;
        const blockSize = this.blockSize;
        const outlineLength = this.outlineLength;

        p.noStroke();
        p.fill(colors.primary);
        p.ellipse(this.x * blockSize + blockSize / 2, this.y * blockSize + blockSize / 2, blockSize - outlineLength * 2, blockSize - outlineLength * 2);
        p.rect(
            (this.x + this.tailBlocks[this.tailBlocks.length - 1].x) * blockSize / 2 + outlineLength,
            (this.y + this.tailBlocks[this.tailBlocks.length - 1].y) * blockSize / 2 + outlineLength,
            blockSize - outlineLength * 2,
            blockSize - outlineLength * 2
        );
        for (var a = 0; a < this.tailBlocks.length; a++)
            p.ellipse(this.tailBlocks[a].x * blockSize + blockSize / 2, this.tailBlocks[a].y * blockSize + blockSize / 2, blockSize - outlineLength * 2, blockSize - outlineLength * 2),
                a < this.tailBlocks.length - 1 && p.rect(
                    (this.tailBlocks[a].x + this.tailBlocks[a + 1].x) / 2 * blockSize + outlineLength,
                    (this.tailBlocks[a].y + this.tailBlocks[a + 1].y) / 2 * blockSize + outlineLength,
                    blockSize - outlineLength * 2,
                    blockSize - outlineLength * 2
                );
        this.weWin || this.apple.show(colors.accent);
    }

    move() {
        if (!this.weWin) {
            if (!this.controlledByPlayer)
                if ((!this.path || this.path.pathCounter >= this.path.pathLength)) {
                    this.calculatePath();
                }

            if (this.path && this.path.pathLength !== 0) {
                let nextMove = this.path.getNextMove();
                this.velX = nextMove.x;
                this.velY = nextMove.y;
            } else {
                let nextPos = this.getNextPosition();
                this.velX = nextPos.x - this.x;
                this.velY = nextPos.y - this.y;
            }
            this.addCount <= 0 ? (this.tailBlocks.splice(0, 1), this.tailCyclePosition = (this.tailCyclePosition + 1) % this.cycle!.length) : this.addCount--;
            this.tailBlocks.push(this.p.createVector(this.x, this.y));
            this.x += this.velX;
            this.y += this.velY;
        }
    }

    getNextPosition() {
        if (!this.hc || !this.cycle) throw new Error("Hamiltonian cycle not initialized");

        this.appleCyclePosition = this.hc.getNodeNo(this.apple.x, this.apple.y);
        let a = this.hc.getPossiblePositionsFrom(this.x, this.y),
            b = 100000,
            c = 0;
        for (let d = 0; d < a.length; d++) {
            let e = this.appleCyclePosition - a[d];
            for (; e < 0;) e += this.cycle.length;
            !this.overTakesTail(this.cycle[a[d]]) && e < b && (b = e, c = d);
        }
        return b === 100000 ? this.cycle[(this.hc.getNodeNo(this.x, this.y) + 1) % this.cycle.length] : this.cycle[a[c]];
    }

    overTakesTail(a: any, b?: any, c?: any) {
        if (!this.hc || !this.cycle) return false;

        b = b ? b.cycleNo : this.hc.getNodeNo(this.x, this.y);
        c = c ? this.hc.getNodeNo(c.x, c.y) : this.hc.getNodeNo(this.tailBlocks[0].x, this.tailBlocks[0].y);
        if (this.getDistanceBetweenPoints(b, c) <= 50 + this.addCount) return true;
        c = c - 50 - this.addCount;
        c < 0 && (c += this.cycle.length);
        return this.getDistanceBetweenPoints(b, a.cycleNo) >= this.getDistanceBetweenPoints(b, c) ? true : false;
    }

    getPathBasedOnAStar() {
        if (!this.hc || !this.cycle) return null;

        for (var a of this.cycle) a.resetForAStar();
        this.appleCyclePosition = this.hc.getNodeNo(this.apple.x, this.apple.y);
        var b = this.cycle[this.hc.getNodeNo(this.x, this.y)];
        let pathQueue: HPath[] = [];
        let c: HPath | null = null;
        let initialPath = new HPath(b, this.cycle[this.appleCyclePosition], this.p);

        for (pathQueue.push(initialPath); ;) {
            if (pathQueue.length === 0) return c;
            let currentPath: HPath = pathQueue.shift()!;
            if (c && currentPath.pathLength >= (c as HPath).pathLength) continue;
            if (currentPath.distanceToApple === 0) {
                if (c == null || currentPath.pathLength < (c as HPath).pathLength) c = currentPath.clone();
                continue;
            }
            let e = currentPath.getLastNode();
            if (!e.alreadyVisited || currentPath.pathLength < e.shortestDistanceToThisPoint) {
                e.alreadyVisited = true;
                e.shortestDistanceToThisPoint = currentPath.pathLength;
                for (var d of e.edges) {
                    if (this.overTakesTail(d, e, currentPath.getSnakeTailPositionAfterFollowingPath(this)) && d.cycleNo !== e.cycleNo + 1) continue;
                    let f = currentPath.clone();
                    f.addToTail(d);
                    f.getLastNode().alreadyVisited && f.pathLength > f.getLastNode().shortestDistanceToThisPoint || pathQueue.push(f);
                }
            }
            pathQueue.sort((f: HPath, n: HPath) => f.distanceToApple + f.pathLength - (n.distanceToApple + n.pathLength));
        }
    }

    getDistanceBetweenPoints(a: any, b: any) {
        if (!this.cycle) return 0;
        for (a = b - a; a < 0;) a += this.cycle.length;
        return a;
    }

    checkFuturePos() {
        this.x += this.velX;
        this.y += this.velY;
        for (var a = 0; a < this.tailBlocks.length; a++) this.tailBlocks[a].x === this.x && this.tailBlocks[a].y === this.y && (this.dead = true);
        if (this.x < 0 || this.x >= this.blocksX || this.y < 0 || this.y >= this.blocksY) this.dead = true;
        this.x -= this.velX;
        this.y -= this.velY;
        // Logic to handle death/pause handled by caller or state
    }

    update() {
        this.dead || (this.move(), this.checkCollisions());
    }

    checkCollisions() {
        if (this.blocksX * this.blocksY - (this.tailBlocks.length + 1) <= 0) {
            this.weWin = true;
            // p.setup() call handled by caller checking weWin or callback
        } else {
            for (var a = 0; a < this.tailBlocks.length; a++) if (this.tailBlocks[a].x === this.x && this.tailBlocks[a].y === this.y) {
                this.dead = true;
                return;
            }
            this.x < 0 || this.x >= this.blocksX || this.y < 0 || this.y >= this.blocksY ? this.dead = true : this.x === this.apple.x && this.y === this.apple.y && this.ateApple();
        }
    }

    ateApple() {
        this.addCount += 4;
        this.apple = new Apple(this, this.p, this.blocksX, this.blocksY, this.blockSize, this.outlineLength);
        this.calculatePath();
    }

    calculatePath() {
        this.path = this.getPathBasedOnAStar();
    }

    isAppleOnSnake(a: { x: number, y: number }) {
        return this.snakeAtPosition(a.x, a.y);
    }

    snakeAtPosition(a: number, b: number) {
        return this.snakeTailAtPosition(a, b) || this.x == a && this.y == b;
    }

    snakeTailAtPosition(a: number, b: number) {
        for (var c = 0; c < this.tailBlocks.length; c++) if (this.tailBlocks[c].x == a && this.tailBlocks[c].y == b) return true;
        return false;
    }
}

export class Apple {
    x: number;
    y: number;
    p: p5;
    blockSize: number;
    outlineLength: number;

    constructor(a: Snake, p: p5, blocksX: number, blocksY: number, blockSize: number, outlineLength: number) {
        this.p = p;
        this.blockSize = blockSize;
        this.outlineLength = outlineLength;
        this.x = Math.floor(p.random(blocksX));
        for (this.y = Math.floor(p.random(blocksY)); a.isAppleOnSnake(this);) {
            this.x = Math.floor(p.random(blocksX));
            this.y = Math.floor(p.random(blocksY));
        }
    }

    show(color: string) {
        this.p.noStroke();
        this.p.fill(color);
        this.p.push();
        this.p.translate(this.x * this.blockSize + this.outlineLength, this.y * this.blockSize + this.outlineLength);
        this.p.ellipse(this.blockSize / 2, this.blockSize / 2, this.blockSize - 2 * this.outlineLength, this.blockSize - 2 * this.outlineLength);
        this.p.pop();
    }

    isAtPosition(a: number, b: number) {
        return this.x === a && this.y === b;
    }
}

export class HamiltonianCycle implements HamiltonianContext {
    w: number;
    h: number;
    cycle: HNode[];
    spanningTreeNodes: HNode[];
    p: p5;

    constructor(a: number, b: number, p: p5) {
        this.w = a;
        this.h = b;
        this.p = p;
        this.cycle = [];
        this.spanningTreeNodes = [];
        this.createCycle();
    }

    createCycle() {
        const p = this.p;
        this.createSpanningTree();
        var a: HNode[] = [];
        let b: HNode[] = [];
        for (let i = 0; i < this.w; i++)
            for (var c = 0; c < this.h; c++) b.push(new HNode(i, c, p));
        for (var d of b) d.setEdges(b);
        for (let i = 0; i < this.spanningTreeNodes.length; i++) {
            let d = this.spanningTreeNodes[i];
            for (let e of d.spanningTreeAdjacentNodes) {
                let c = (pIdx: any, t: any, q: any, u: any) => {
                    t + this.h * pIdx >= b.length || u + this.h * q >= b.length || (pIdx = b[t + this.h * pIdx], q = b[u + this.h * q], pIdx.spanningTreeAdjacentNodes.push(q), q.spanningTreeAdjacentNodes.push(pIdx));
                };
                let k = d.getDirectionTo(e),
                    l = d.x * 2,
                    m = d.y * 2;
                k.x === 1 ? (c(l + 1, m, l + 2, m), c(l + 1, m + 1, l + 2, m + 1)) :
                    k.y === 1 && (c(l, m + 1, l, m + 2), c(l + 1, m + 1, l + 1, m + 2));
            }
        }
        a = b.filter(k => k.spanningTreeAdjacentNodes.length === 1);
        let e: HEdge[] = [];
        for (let f of a) {
            let dir = f.spanningTreeAdjacentNodes[0].getDirectionTo(f);
            dir.x += f.x;
            dir.y += f.y;
            let edge = new HEdge(b[dir.y + this.h * dir.x], f);
            let d = true;
            for (let n of e) if (n.isEqualTo(edge)) {
                d = false;
                break;
            }
            d && e.push(edge);
        }
        for (let k of e) k.connectNodes();
        a = b.filter(k => k.spanningTreeAdjacentNodes.length === 1);
        e = [];
        for (let g of a)
            for (let h of a)
                if (p.dist(g.x, g.y, h.x, h.y) === 1 && Math.floor(g.x / 2) === Math.floor(h.x / 2) && Math.floor(g.y / 2) === Math.floor(h.y / 2)) {
                    let f = new HEdge(h, g);
                    let n = true;
                    for (let r of e) if (r.isEqualTo(f)) {
                        n = false;
                        break;
                    }
                    n && e.push(f);
                    break;
                }
        for (let k of e) k.connectNodes();
        let randomElement = b[Math.floor(p.random(b.length))];
        a = [randomElement];
        let g = a[0];
        for (let h = a[0].spanningTreeAdjacentNodes[0]; h !== a[0];) {
            let r = h.spanningTreeAdjacentNodes[0];
            r === g && (r = h.spanningTreeAdjacentNodes[1]);
            a.push(h);
            g = h;
            h = r;
        }
        this.cycle = a;
        for (let i = 0; i < this.cycle.length; i++) this.cycle[i].cycleNo = i;
    }

    createSpanningTree() {
        const p = this.p;
        let a: HNode[] = [];
        for (var b = 0; b < this.w / 2; b++) for (let i = 0; i < this.h / 2; i++) a.push(new HNode(b, i, p));
        for (var d of a) d.setEdges(a);
        let edges: HEdge[] = [];
        let c = a[Math.floor(p.random(a.length))];
        edges.push(new HEdge(c, c.edges[0]));
        let e = [c, c.edges[0]];
        for (; e.length < a.length;) {
            c = (e as any).getRandomElement(p);
            const filteredEdges = c.edges.filter((f: HNode) => !e.includes(f));
            if (filteredEdges.length !== 0) {
                d = (filteredEdges as any).getRandomElement(p);
                e.push(d);
                edges.push(new HEdge(c, d));
            }
        }
        for (let f of a) f.setSpanningTreeEdges(edges);
        this.spanningTreeNodes = a;
    }

    getNextPosition(a: any, b: any) {
        for (let c = 0; c < this.cycle.length; c++) if (this.cycle[c].x === a && this.cycle[c].y === b) return this.cycle[(c + 1) % this.cycle.length];
        return null;
    }

    getNodeNo(a: any, b: any) {
        for (let c = 0; c < this.cycle.length; c++) if (this.cycle[c].x === a && this.cycle[c].y === b) return c;
        return -1;
    }

    getPossiblePositionsFrom(a: any, b: any) {
        const node = this.cycle[this.getNodeNo(a, b)];
        if (!node) return [];
        let positions: number[] = [];
        for (let c of node.edges) positions.push(this.getNodeNo(c.x, c.y));
        return positions;
    }
}

// Add randomElement to Array prototype manually for the cycle generation logic or use helper
// Since we are in strict module mode, extending prototype might be tricky or bad practice.
// Let's replace `(Array.prototype as any).getRandomElement` with a helper function.
function getRandomElement(arr: any[], p: p5): any {
    return arr[Math.floor(p.random(arr.length))];
}

class HNode {
    x: number;
    y: number;
    spanningTreeAdjacentNodes: HNode[];
    cycleNo: number;
    alreadyVisited: boolean;
    shortestDistanceToThisPoint: number;
    edges: HNode[];
    p: p5;

    constructor(a: number, b: number, p: p5) {
        this.x = a;
        this.y = b;
        this.p = p;
        this.spanningTreeAdjacentNodes = [];
        this.cycleNo = -1;
        this.alreadyVisited = false;
        this.shortestDistanceToThisPoint = 0;
        this.edges = [];
    }
    setEdges(a: HNode[]) {
        this.edges = a.filter(b => this.p.dist(b.x, b.y, this.x, this.y) === 1);
    }
    setSpanningTreeEdges(a: HEdge[]) {
        for (let b of a) b.contains(this) && this.spanningTreeAdjacentNodes.push(b.getOtherNode(this));
    }
    getNextNodeMovingLeft(a: HNode): HNode {
        let b = a.getDirectionTo(this);
        let directions: { x: number; y: number; }[] = [];
        for (var c of this.spanningTreeAdjacentNodes) directions.push(this.getDirectionTo(c));
        for (let c = getLeftOf(b); !directions.some(dir => dir.x === c.x && dir.y === c.y);) c = getRightOf(c);
        return this.spanningTreeAdjacentNodes[directions.findIndex(dir => dir.x === c.x && dir.y === c.y)];
    }
    getDirectionTo(a: HNode): { x: number; y: number; } {
        return { x: a.x - this.x, y: a.y - this.y };
    }
    resetForAStar() {
        this.alreadyVisited = false;
        this.shortestDistanceToThisPoint = 0;
    }
}

function getLeftOf(a: { x: number; y: number; }): { x: number; y: number; } {
    return a.x === 0 && a.y === 1 ? { x: 1, y: 0 } :
        a.x === 0 && a.y === -1 ? { x: -1, y: 0 } :
            a.x === 1 ? { x: 0, y: -1 } : { x: 0, y: 1 };
}
function getRightOf(a: { x: number; y: number; }): { x: number; y: number; } {
    return a.x === 0 && a.y === 1 ? { x: -1, y: 0 } :
        a.x === 0 && a.y === -1 ? { x: 1, y: 0 } :
            a.x === 1 ? { x: 0, y: 1 } : { x: 0, y: -1 };
}

class HEdge {
    node1: HNode;
    node2: HNode;
    constructor(a: HNode, b: HNode) {
        this.node1 = a;
        this.node2 = b;
    }
    isEqualTo(a: HEdge): boolean {
        return this.node1 === a.node1 && this.node2 === a.node2 || this.node1 === a.node2 && this.node2 === a.node1;
    }
    contains(a: HNode): boolean {
        return a === this.node1 || a === this.node2;
    }
    getOtherNode(a: HNode): HNode {
        return a === this.node1 ? this.node2 : this.node1;
    }
    connectNodes() {
        this.node1.spanningTreeAdjacentNodes.push(this.node2);
        this.node2.spanningTreeAdjacentNodes.push(this.node1);
    }
}

class HPath {
    pathLength: number;
    nodesInPath: HNode[];
    finishNode: HNode;
    distanceToApple: number;
    pathCounter: number;
    p: p5;

    constructor(a: HNode, b: HNode, p: p5) {
        this.p = p;
        this.pathLength = 0;
        this.nodesInPath = [a];
        this.finishNode = b;
        this.distanceToApple = 0;
        this.setDistanceToApple();
        this.pathCounter = 0;
    }
    setDistanceToApple() {
        this.distanceToApple = this.p.dist(this.finishNode.x, this.finishNode.y, this.getLastNode().x, this.getLastNode().y);
    }
    addToTail(a: HNode) {
        this.nodesInPath.push(a);
        this.pathLength += 1;
        this.setDistanceToApple();
    }
    getLastNode(): HNode {
        return this.nodesInPath[this.nodesInPath.length - 1];
    }
    getSnakeTailPositionAfterFollowingPath(a: Snake): HNode {
        const tailBlocksAsHNodes = a.tailBlocks.map(block => new HNode(block.x, block.y, this.p));
        return this.pathLength - a.addCount < tailBlocksAsHNodes.length ?
            tailBlocksAsHNodes[Math.max(0, this.pathLength - a.addCount)]
            :
            this.nodesInPath[this.pathLength - a.addCount - tailBlocksAsHNodes.length];
    }
    getNextMove(): { x: number; y: number; } {
        let a = this.nodesInPath[this.pathCounter + 1].x - this.nodesInPath[this.pathCounter].x,
            b = this.nodesInPath[this.pathCounter + 1].y - this.nodesInPath[this.pathCounter].y;
        this.pathCounter++;
        return { x: a, y: b };
    }
    clone(): HPath {
        let a = new HPath(this.nodesInPath[0], this.finishNode, this.p);
        a.nodesInPath = [...this.nodesInPath];
        a.pathLength = this.pathLength;
        a.distanceToApple = this.distanceToApple;
        return a;
    }
}

// Monkey patch helper needed for the Hamiltonian cycle generation
(Array.prototype as any).getRandomElement = function (p: p5): any {
    return this[Math.floor(p.random(this.length))];
};

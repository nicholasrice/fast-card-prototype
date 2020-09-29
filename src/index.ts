import { DOM } from '@microsoft/fast-element';
import { TestRenderer } from "./renderer";


TestRenderer;
const sum = (a: number, b: number) => a + b;
const mean = (set: number[]) => set.reduce(sum) / set.length;
const ascending = (a, b) => {
    return a < b ? -1 : a > b ? 1 : 0;
}
const median = (x: number[]) => x.concat().sort(ascending)[Math.floor(x.length / 2)]
const duration = x => x.duration;

const el = document.createElement("test-renderer");
el.setAttribute("count", (100).toString());

document.body.appendChild(el)

DOM.queueUpdate(() => {
    const construction = performance.getEntriesByName("construction").map(duration).sort(ascending);
    const connected = performance.getEntriesByName("connected").map(duration).sort(ascending);
    const output = {
        construction: {
            mean: mean(construction),
            median: median(construction),
            min: construction[0],
            max: construction[construction.length - 1],
            total: construction.reduce(sum)
        },
        connected: {
            mean: mean(connected),
            median: median(connected),
            min: connected[0],
            max: connected[connected.length - 1],
            total: connected.reduce(sum)
        }
    }
    
    console.log(JSON.stringify(output, null, 2))
})



import { FASTCard, CardStyles } from "@microsoft/fast-components";
import { CardTemplate } from "@microsoft/fast-foundation";
import { customElement } from "@microsoft/fast-element";

const constructorStart = "constructorStart";
const constructorEnd = "constructorEnd";

const connectedStart = "connectedStart";
const connectedEnd = "connectedEnd";


let id = 0;

export function constructTestElement(ctor: any): any {
    return class extends ctor {
        public id: number;

        constructor() {
            const _id = id = id += 1;
            performance.mark(`${_id}-${constructorStart}`);
            super();
            performance.mark(`${_id}-${constructorEnd}`);
            this.id = _id;
        }

        connectedCallback() {
            performance.mark(`${this.id}-${connectedStart}`);
            super.connectedCallback();
            performance.mark(`${this.id}-${connectedEnd}`);

            performance.measure("construction", `${this.id}-${constructorStart}`, `${this.id}-${constructorEnd}`);
            performance.measure("connected", `${this.id}-${connectedStart}`, `${this.id}-${connectedEnd}`);
        }
    }
}

@customElement({
    name: "test-card",
    template: CardTemplate,
    styles: CardStyles
})
export class TestCard extends constructTestElement(FASTCard) {}

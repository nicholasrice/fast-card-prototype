import { attr, css, customElement, FASTElement, html, nullableNumberConverter, observable, repeat } from "@microsoft/fast-element";
import { FASTButton, FASTDesignSystemProvider } from "@microsoft/fast-components";
import { TestCard } from "./test-element";

FASTDesignSystemProvider;
FASTButton;
TestCard;

@customElement({
    name: "test-renderer",
    template: html`
        <fast-design-system-provider use-defaults>
            ${repeat(x => x.set, html`
                <test-card>
                    <fast-button>Hello world</fast-button>
                </test-card>
            `)}
        </fast-design-system-provider>
    `,
    styles: css`:host{display: block}`
})
export class TestRenderer extends FASTElement {
    @attr({converter: nullableNumberConverter})
    public count: number = 100;
    private countChanged() {
        this.set = new Array(this.count).fill("");
    }

    @observable
    public set: string[] = new Array(this.count).fill("")
}
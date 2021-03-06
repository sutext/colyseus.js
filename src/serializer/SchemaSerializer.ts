import { Serializer } from "./Serializer";
import { Schema, Reflection } from "@colyseus/schema";

export type RootSchemaConstructor = new (...args: any[]) => Schema;

export class SchemaSerializer<T extends Schema= any> implements Serializer<T> {
    state: T;

    setState(rawState: any): void {
        (this.state as any).decode(rawState);
    }

    getState() {
        return this.state;
    }

    patch(patches) {
        (this.state as any).decode(patches);
    }

    teardown() {
        // this.state.onRemove
    }

    handshake(bytes: number[]) {
        if (this.state) {
            // validate client/server definitinos
            const reflection = new Reflection();
            reflection.decode(bytes);

        } else {
            // initialize reflected state from server
            this.state = Reflection.decode(bytes) as any;
        }
    }
}

import { Access } from "./Access";
import { Annotation } from "./Annotation";
import { ClassReference } from "./ClassReference";
import { CodeBlock } from "./CodeBlock";
import { AstNode } from "./core/AstNode";
import { Writer } from "./core/Writer";
import { Field } from "./Field";
import { Interface } from "./Interface";
import { Method } from "./Method";
import { Parameter } from "./Parameter";

export declare namespace Class {
    interface Args {
        /* The name of the C# class */
        name: string;
        /* The namespace of the C# class*/
        namespace: string;
        /* The access level of the C# class */
        access: Access;
        /* Defaults to false */
        sealed?: boolean;
        /* Defaults to false */
        partial?: boolean;
        /* Defaults to false */
        record?: boolean;
        /* The class to inherit from if any */
        parentClassReference?: ClassReference;
        /* Any interfaces the class extends */
        interfaceReferences?: ClassReference[];
        /* Defaults to false */
        isNestedClass?: boolean;
        /* Any annotations to add to the class */
        annotations?: Annotation[];
    }

    interface Constructor {
        /* The body of the constructor */
        body?: CodeBlock;
        /* The parameters of the constructor */
        parameters: Parameter[];
        /* The access of the constructor */
        access: Access;
    }
}

export class Class extends AstNode {
    public readonly name: string;
    public readonly namespace: string;
    public readonly access: Access;
    public readonly sealed: boolean;
    public readonly partial: boolean;
    public readonly reference: ClassReference;
    public readonly parentClassReference: ClassReference | undefined;
    public readonly interfaceReferences: ClassReference[];
    public readonly isNestedClass: boolean;
    public readonly record: boolean;
    public readonly annotations: Annotation[] = [];

    private fields: Field[] = [];
    private constructors: Class.Constructor[] = [];
    private methods: Method[] = [];
    private nestedClasses: Class[] = [];
    private nestedInterfaces: Interface[] = [];

    constructor({
        name,
        namespace,
        access,
        sealed,
        partial,
        parentClassReference,
        interfaceReferences,
        isNestedClass,
        record
    }: Class.Args) {
        super();
        this.name = name;
        this.namespace = namespace;
        this.access = access;
        this.sealed = sealed ?? false;
        this.partial = partial ?? false;
        this.isNestedClass = isNestedClass ?? false;
        this.record = record ?? false;

        this.parentClassReference = parentClassReference;
        this.interfaceReferences = interfaceReferences ?? [];

        this.reference = new ClassReference({
            name: this.name,
            namespace: this.namespace
        });
    }

    public addField(field: Field): void {
        this.fields.push(field);
    }

    public addConstructor(constructor: Class.Constructor): void {
        this.constructors.push(constructor);
    }

    public addMethod(method: Method): void {
        this.methods.push(method);
    }

    public addNestedClass(subClass: Class): void {
        this.nestedClasses.push(subClass);
    }

    public addNestedInterface(subInterface: Interface): void {
        this.nestedInterfaces.push(subInterface);
    }

    public write(writer: Writer): void {
        if (!this.isNestedClass) {
            writer.writeLine(`namespace ${this.namespace};`);
            writer.newLine();
        }
        if (this.annotations.length > 0) {
            writer.write("[");
            this.annotations.forEach((annotation) => {
                annotation.write(writer);
            });
            writer.write("]");
            writer.writeNewLineIfLastLineNot();
        }
        writer.write(`${this.access}`);
        if (this.sealed) {
            writer.write(" sealed");
        }
        if (this.partial) {
            writer.write(" partial");
        }
        writer.write(this.record ? " record" : " class");
        writer.write(` ${this.name}`);
        if (this.parentClassReference != null || this.interfaceReferences.length > 0) {
            writer.write(" : ");
            if (this.parentClassReference != null) {
                this.parentClassReference.write(writer);
                if (this.interfaceReferences.length > 0) {
                    writer.write(", ");
                }
            }
            this.interfaceReferences.forEach((interfaceReference, index) => {
                interfaceReference.write(writer);
                // Don't write a comma after the last interface
                if (index < this.interfaceReferences.length - 1) {
                    writer.write(", ");
                }
            });
        }
        writer.writeNewLineIfLastLineNot();
        writer.writeLine("{");

        writer.indent();
        this.writeFields({ writer, fields: this.getFieldsByAccess(Access.Private) });
        writer.dedent();

        writer.indent();
        this.writeConstructors({ writer, constructors: this.constructors });
        writer.dedent();

        writer.indent();
        this.writeFields({ writer, fields: this.getFieldsByAccess(Access.Public) });
        writer.dedent();

        writer.indent();
        this.nestedClasses.forEach((nestedClass, index) => {
            nestedClass.write(writer);
            writer.writeNewLineIfLastLineNot();

            if (index < this.fields.length - 1) {
                writer.newLine();
            }
        });
        writer.dedent();

        writer.indent();
        this.nestedInterfaces.forEach((nestedInterface, index) => {
            nestedInterface.write(writer);
            writer.writeNewLineIfLastLineNot();

            if (index < this.fields.length - 1) {
                writer.newLine();
            }
        });
        writer.dedent();

        writer.indent();
        this.writeMethods({ writer, methods: this.getMethodsByAccess(Access.Public) });
        writer.dedent();

        writer.indent();
        this.writeMethods({ writer, methods: this.getMethodsByAccess(Access.Private) });
        writer.dedent();

        writer.writeLine("}");
    }

    private writeConstructors({ writer, constructors }: { writer: Writer; constructors: Class.Constructor[] }): void {
        constructors.forEach((constructor, index) => {
            writer.write(`${constructor.access} ${this.name} (`);
            constructor.parameters.forEach((parameter, index) => {
                parameter.write(writer);
                if (index < constructor.parameters.length - 1) {
                    writer.write(", ");
                }
            });
            writer.write(")");

            writer.writeLine(" {");
            writer.indent();
            constructor.body?.write(writer);
            writer.dedent();
            writer.writeLine("}");
            writer.newLine();
        });
    }

    private writeMethods({ writer, methods }: { writer: Writer; methods: Method[] }): void {
        methods.forEach((method, index) => {
            method.write(writer);
            writer.writeNewLineIfLastLineNot();
            writer.newLine();
        });
    }

    private getMethodsByAccess(access: Access): Method[] {
        return this.methods.filter((method) => method.access === access);
    }

    private writeFields({ writer, fields }: { writer: Writer; fields: Field[] }): void {
        fields.forEach((field, index) => {
            field.write(writer);
            writer.writeNewLineIfLastLineNot();

            if (index < this.fields.length - 1) {
                writer.newLine();
            }
        });
    }

    private getFieldsByAccess(access: Access): Field[] {
        return this.fields.filter((field) => field.access === access);
    }

    public getFields(): Field[] {
        return this.fields;
    }
}

import { AbsoluteFilePath, dirname, RelativeFilePath, resolve } from "@fern-api/fs-utils";
import { TaskContext } from "@fern-api/task-context";
import { readFile } from "fs/promises";
import grayMatter from "gray-matter";

async function defaultMarkdownLoader(filepath: AbsoluteFilePath) {
    // strip frontmatter from the referenced markdown
    const { content } = grayMatter(await readFile(filepath));
    return content;
}

// TODO: recursively replace referenced markdown files
// TODO: inherit indentation from parent markdown file when replacing referenced markdown snippets
export async function replaceReferencedMarkdown({
    markdown,
    absolutePathToFernFolder,
    absolutePathToMdx,
    context,
    // allow for custom markdown loader for testing
    markdownLoader = defaultMarkdownLoader
}: {
    markdown: string;
    absolutePathToFernFolder: AbsoluteFilePath;
    absolutePathToMdx: AbsoluteFilePath;
    context: TaskContext;
    markdownLoader?: (filepath: AbsoluteFilePath) => Promise<string>;
}): Promise<string> {
    if (!markdown.includes("<Markdown")) {
        return markdown;
    }

    const regex = /<Markdown\s+src={?['"]([^'"]+.mdx?)['"](?! \+)}?\s*\/>/g;

    let newMarkdown = markdown;

    // while match is found, replace the match with the content of the referenced markdown file
    let match: RegExpExecArray | null;
    while ((match = regex.exec(markdown)) != null) {
        const matchString = match[0];
        const src = match[1];

        if (matchString == null || src == null) {
            throw new Error(`Failed to parse regex "${match}" in ${absolutePathToMdx}`);
        }

        const filepath = resolve(
            src.startsWith("/") ? absolutePathToFernFolder : dirname(absolutePathToMdx),
            RelativeFilePath.of(src.replace(/^\//, ""))
        );

        try {
            newMarkdown = newMarkdown.replace(matchString, await markdownLoader(filepath));
        } catch (e) {
            context.failAndThrow(`Failed to read markdown file "${src}" referenced in ${absolutePathToMdx}`, e);
            break;
        }
    }

    return newMarkdown;
}

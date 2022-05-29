import React, { Dispatch, SetStateAction } from "react";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { Editor, rootCtx } from "@milkdown/core";
import { nord } from "@milkdown/theme-nord";
import { ReactEditor, useEditor } from "@milkdown/react";
import { commonmark } from "@milkdown/preset-commonmark";

export interface EditorProps {
  output: Dispatch<SetStateAction<string>>;
}

export const MilkdownEditor = ({ output }: EditorProps) => {
  const editor = useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
        ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
          output(markdown);
        });
      })
      .use(nord)
      .use(listener)
      .use(commonmark)
  );

  return <ReactEditor editor={editor} />;
};

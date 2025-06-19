"use client";

import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  ForwardedRef,
} from "react";

import Quill from "quill";

interface Props {
  readOnly?: boolean;
  defaultValue?: string;
  onTextChange?: (value: string) => void;
  required?: boolean;
  minimal?: boolean;
  maxSize?: number;
  label?: string;
  height?: string;
  ref?: ForwardedRef<any>;
  classNameInput?: string;
}

const Editor = forwardRef(
  (
    {
      readOnly,
      defaultValue,
      onTextChange,
      label = "Descripción",
      required,
      height,
      classNameInput,
    }: Props,
    ref: ForwardedRef<any>
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const onTextChangeRef = useRef(onTextChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
    });

    useEffect(() => {
      ref?.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      if (height) container.style.height = height;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div")
      );
      const quill = new Quill(editorContainer, {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'link'],
            [{ list: 'ordered' }, { list: 'bullet' }], // 👈 esto agrega OL y UL
          ],
        },
        theme: "snow",
      });

      quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node) => {
        const plainText = node.textContent || "";
        return new Quill.imports.delta().insert(plainText);
      });

      ref.current = quill;

      if (defaultValue) {
        container.querySelector(".ql-editor").innerHTML = defaultValue;
      }
      quill.on(Quill.events.TEXT_CHANGE, () => {
        const html = container.querySelector(".ql-editor").innerHTML;

        onTextChangeRef.current?.(html);
      });

      return () => {
        ref.current = null;
        container.innerHTML = "";
      };
    }, [ref]);

    return (
      <div>
        <label className="block mb-2 text-sm">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div
          ref={containerRef}
          className={`flex flex-col text-white-700 ${classNameInput}`}
        ></div>
      </div>
    );
  }
);

Editor.displayName = "Editor";

export default Editor;

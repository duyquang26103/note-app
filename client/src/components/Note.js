import React, {useEffect, useMemo, useState} from 'react';
import { ContentState, EditorState, convertToRaw, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import { useLoaderData, useSubmit, useLocation } from "react-router-dom";
import {debounce} from "@mui/material";


export default function Note() {
    const { note } = useLoaderData();
    const submit = useSubmit();
    const location = useLocation();
    const [editorState, setEditorState] = useState(() => {
        return EditorState.createEmpty();
    });
    const [rawHTML, setRawHTML] = useState(note.content);

    const debouncedMemorized = useMemo(() => {
        return debounce((rawHTML, note, pathname) => {
            if (rawHTML !== note.content) {
                submit({...note, content: rawHTML}, {
                    method: 'post',
                    action: pathname
                });
            }
        },500)
    },[]);

    useEffect(() => {
        const blockFormHTML = convertFromHTML(note.content);
        const state = ContentState.createFromBlockArray(
            blockFormHTML.contentBlocks,
            blockFormHTML.entityMap
        )
        setEditorState(EditorState.createWithContent(state))
    },[note.id]);

    useEffect(() => {
        setRawHTML(note.content);
    },[note.content]);

    useEffect(() => {
        debouncedMemorized(rawHTML, note, location.pathname)
    },[rawHTML, location.pathname]);

    const handleOnChange = (e) => {
        setEditorState(e);
        setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
    }
    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={handleOnChange}
            placeholder='Write something!'
        />
    );
}

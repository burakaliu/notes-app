import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import CreatableReactSelect from 'react-select/creatable';
import { NoteData, Tag } from "./App";
import { v4 as uuidV4 } from 'uuid';

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
} & Partial<NoteData>

export function NoteForm({onSubmit, onAddTag, availableTags, title = "", markdown = "", tags = []}: NoteFormProps){
    const titleRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate()

    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)

    function handleSubmit(e: FormEvent){
        e.preventDefault();

        onSubmit({
            title: titleRef.current!.value,
            markdown: textRef.current!.value,
            tags: selectedTags
        })

        navigate("..")
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control required type="text" ref={titleRef} defaultValue={title}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect 
                            onCreateOption={label => {
                                const newTag = {id: uuidV4(), label}
                                onAddTag(newTag)
                                setSelectedTags(prev => [...prev, newTag])
                            }}
                            value={selectedTags.map(tag => {
                                return {label: tag.label, value: tag.id}
                            })} 
                            options={availableTags.map(tag => {
                                return {label: tag.label, value: tag.id}
                            })}
                            onChange={tags => {
                                setSelectedTags(
                                    tags.map(tag => {
                                        return {label: tag.label, id: tag.value}
                                    })
                                )}}
                            isMulti />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control as="textarea" required rows={10} ref={textRef} defaultValue={markdown}/>
                </Form.Group>
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <Button variant="primary" type="submit">Save</Button>
                    <Link to=".." >
                        <Button variant="outline-secondary">Cancel</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    )
}
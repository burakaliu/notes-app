import { Link, Route, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import ReactMarkDown from "react-markdown";

type NoteProps = {
    onDelete: (id: string) => void
}

export function Note({onDelete}: NoteProps) {
    const note = useNote()
    const navigate = useNavigate()
    return <>
        <Row className="align-items-center mb-4">
            <Col>
                <h1>{note.title}</h1>
                {note.tags.length > 0 && (
                        <Stack direction="horizontal" gap={1} className="flex-wrap"> {
                            note.tags.map(tag => (
                                <Badge className="text-truncate" key={tag.id}>{tag.label}</Badge>
                            ))
                        }
                        </Stack>
                    )}
            </Col>
            <Col xs="auto">
                <Stack direction="horizontal" gap={2}>
                    <Link to={`/${note.id}/edit`}>
                        <Button variant="primary">Edit</Button>
                    </Link>
                    <Button onClick={
                        () => {
                            if (window.confirm("Are you sure you want to delete this note?")){
                                onDelete(note.id)
                                navigate("/")
                            }
                        }
                    } variant="outline-danger">Delete</Button>
                    <Link to={`/`}>
                        <Button variant="outline-secondary">back</Button>
                    </Link>                
                </Stack>
            </Col>
        </Row>
        <ReactMarkDown>{note.markdown}</ReactMarkDown>
    </>;
}
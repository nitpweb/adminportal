import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { MainAttachment } from './../common-props/main-attachment'
import TextField from '@material-ui/core/TextField'
import { useSession } from 'next-auth/client'
import React, { useState } from 'react'
import { AddAttachments } from './../common-props/add-attachment'
import { fileUploader } from './../common-props/useful-functions'
import { BroadcastMail } from './../common-props/send-broadcast-mail'

export const AddForm = ({ handleClose, modal }) => {
    const [session, loading] = useSession()
    const [content, setContent] = useState({
        title: '',
        openDate: '',
        closeDate: '',
        venue: '',
        doclink: '',
        eventStartDate: '',
        eventEndDate: '',
    })
    const [submitting, setSubmitting] = useState(false)

    const [attachments, setAttachments] = useState([])
    const [mainAttachment, setMainAttachment] = useState({
        caption: '',
        url: '',
        value: '',
        typeLink: false,
    })

    const [broadcastMail, setBroadcastMail] = useState({
        broadcast: false,
        mail: 'students@nitp.ac.in',
    })

    const handleChange = (e) => {
        setContent({ ...content, [e.target.name]: e.target.value })
        //console.log(content)
    }

    const handleSubmit = async (e) => {
        setSubmitting(true)
        e.preventDefault()
        let open = new Date(content.openDate)
        let close = new Date(content.closeDate)
        let eventStart = new Date(content.eventStartDate)
        let eventEnd = new Date(content.eventEndDate)
        open = open.getTime()
        close = close.getTime()
        eventStart = eventStart.getTime()
        eventEnd = eventEnd.getTime()
        let now = Date.now()

        let data = {
            ...content,
            id: now,
            openDate: open,
            closeDate: close,
            eventStartDate: eventStart,
            eventEndDate: eventEnd,
            timestamp: now,
            email: session.user.email,
            main_attachment: mainAttachment,
            author: session.user.name,
            attachments: [...attachments],
        }
        for (let i = 0; i < data.attachments.length; i++) {
            delete data.attachments[i].value
            // if (data.attachments[i].url === undefined) {
            // 	data.attachments[i].url = "";
            // }
            console.log(data.attachments[i])

            if (
                data.attachments[i].typeLink == false &&
                data.attachments[i].url
            ) {
                delete data.attachments[i].typeLink
                data.attachments[i].url = await fileUploader(
                    data.attachments[i]
                )
            } else {
                delete data.attachments[i].typeLink
                console.log('NOT A FILE')
            }
        }
        delete data.main_attachment.value
        if (!data.main_attachment.typeLink) {
            data.main_attachment.url = await fileUploader(data.main_attachment)
        }
        // data.attachments = JSON.stringify(data.attachments);
        console.log(data)
        let result = await fetch('/api/create/event', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data),
        })
        result = await result.json()
        if (result instanceof Error) {
            console.log('Error Occured')
            console.log(result)
            window.location.reload()
        }

        // Broadcast after event is created
        if (broadcastMail.broadcast) {
            let data = {
                type: 'event',
                email: broadcastMail.mail,
                event: 'result',
            }
            let result = await fetch('/api/broadcast', {
                method: 'POST',
                body: JSON.stringify(data),
            })
            result = await result.json()
            if (result instanceof Error) {
                alert('Event created but an error occured while sending mail')
                console.log(result)
            }
        }

        window.location.reload()
    }

    return (
        <>
            <Dialog open={modal} onClose={handleClose}>
                <form
                    onSubmit={(e) => {
                        handleSubmit(e)
                    }}
                >
                    <DialogTitle disableTypography style={{ fontSize: `2rem` }}>
                        Add Event
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="label"
                            label="Title"
                            name="title"
                            type="text"
                            required
                            fullWidth
                            placeholder="Title"
                            onChange={(e) => handleChange(e)}
                            value={content.title}
                        />
                        <TextField
                            margin="dense"
                            id="openDate"
                            label="Open Date"
                            name="openDate"
                            type="date"
                            required
                            value={content.openDate}
                            onChange={(e) => handleChange(e)}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="closeDate"
                            label="Close Date"
                            name="closeDate"
                            margin="dense"
                            required
                            type="date"
                            onChange={(e) => handleChange(e)}
                            value={content.closeDate}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="eventStartDate"
                            label="Event Start Date"
                            name="eventStartDate"
                            type="date"
                            required
                            value={content.eventStartDate}
                            onChange={(e) => handleChange(e)}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="eventEndDate"
                            label="Event End Date"
                            name="eventEndDate"
                            margin="dense"
                            required
                            type="date"
                            onChange={(e) => handleChange(e)}
                            value={content.eventEndDate}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            margin="dense"
                            id="venue"
                            label="Venue"
                            type="text"
                            fullWidth
                            placeholder={'Venue of Event'}
                            name="venue"
                            type="text"
                            required
                            onChange={(e) => handleChange(e)}
                            value={content.venue}
                        />
                        <TextField
                            margin="dense"
                            id="Doclink"
                            label="Registration form link (like: Google Doc, etc.) "
                            type="text"
                            fullWidth
                            placeholder={'Leave it blank if not available'}
                            name="doclink"
                            type="text"
                            onChange={(e) => handleChange(e)}
                            value={content.doclink}
                        />
                        <MainAttachment
                            mainAttachment={mainAttachment}
                            setMainAttachment={setMainAttachment}
                            placeholder="Main Event Link/Attach"
                        />

                        <BroadcastMail
                            broadcastMail={broadcastMail}
                            setBroadcastMail={setBroadcastMail}
                        />

                        <h2>Attachments</h2>
                        <AddAttachments
                            attachments={attachments}
                            setAttachments={setAttachments}
                        />
                        {/* <a href={data.attachments} target="_blank">
							<FontAwesomeIcon icon={faExternalLinkAlt} />
						</a> */}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="submit"
                            color="primary"
                            disabled={submitting}
                        >
                            {submitting ? 'Submitting' : 'Submit'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

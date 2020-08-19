import React, { useState } from "react"
import { Button, Form, FormGroup, Label, Input } from "reactstrap"
import axios from "axios"

const TokenForm = ({ storeToken }) => {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const result = await axios({
        method: "POST",
        url: process.env.TWILIO_FUNCTION_NAME,
        data: {
          identity: name,
        },
      })
      const jwt = result.data
      storeToken(jwt)
    } catch (error) {
      console.log(`Error in Join Room Form: ${error}`)
    }
  }
  return (
    <Form onSubmit={handleSubmit} inline>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label htmlFor="displayName" className="mr-sm-1">
          Display Name:
        </Label>
        <Input
          type="text"
          id="displayName"
          name="displayName"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="something@idk.cool"
        />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0 ">
        <Label htmlFor="roomToJoin" className="mr-sm-1">
          Room to Join:
        </Label>
        <Input
          type="text"
          name="roomToJoin"
          id="roomToJoin"
          value={room}
          onChange={e => setRoom(e.target.value)}
          placeholder="don't tell!"
        />
      </FormGroup>
      <Button type="submit">Join Video</Button>
    </Form>
  )
}

export default TokenForm

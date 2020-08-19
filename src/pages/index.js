import React, { useState, useRef, useEffect } from "react"
import TwilioVideo from "twilio-video"

import Layout from "../components/layout"
import TokenForm from "../components/tokenForm"
// import Image from "../components/image"
import SEO from "../components/seo"

const Video = ({ token }) => {
  const localVidRef = useRef(null)
  const remoteVidRef = useRef(null)

  useEffect(() => {
    TwilioVideo.connect(token, {
      video: true,
      audio: true,
      name: "VideoTest",
    })
      .then(room => {
        TwilioVideo.createLocalVideoTrack().then(track => {
          localVidRef.current.appendChild(track.attach())
        })
        const addParticipant = participant => {
          console.log("new participant")
          console.log(participant.identity)
          // room.participants.forEach(participant => {
          participant.tracks.forEach(publication => {
            if (publication.isSubscribed) {
              const track = publication.tract
              remoteVidRef.current.appendChild(track.attach())
            }
          })
        }

        room.participants.forEach(addParticipant)
        room.on("participantConnected", addParticipant)
      })
      .catch(error => console.log(error))
  }, [token])

  return (
    <div>
      <div ref={localVidRef}></div>
      <div ref={remoteVidRef}></div>
    </div>
  )
}

const IndexPage = () => {
  const [token, setToken] = useState(false)
  return (
    <Layout>
      <SEO title="Home" />
      {!token ? <TokenForm storeToken={setToken} /> : <Video token={token} />}

      <ul>
        <ol>Show Local Videos</ol>
        <ol>Connect To A Room</ol>
        <ol>Show participants video (remote)</ol>
        <ol>Handle Events</ol>
      </ul>
    </Layout>
  )
}

export default IndexPage

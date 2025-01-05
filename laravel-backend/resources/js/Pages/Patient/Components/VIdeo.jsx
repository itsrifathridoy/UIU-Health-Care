import React, {useState} from 'react';
import AgoraUIKit from 'agora-react-uikit';
import {Link} from "@inertiajs/react";

const Video = ({id}) => {
    const [videoCall, setVideoCall] = useState(true);
    const isHost = true;
    const rtcProps = {
        appId: '7ac8fd57b5ef4b3b910c10c6025bbfa0',
        channel: id, // your agora channel
        token: null, // use null or skip if using app in testing mode
        layout: 1,
        enableScreensharing: true,
        role: isHost ? 'host' : 'audience',

    };
    const rtmProps={
        username: "username",
        displayUsername: true
    };

    const callbacks = {
        EndCall: () => setVideoCall(false),
    };
    return videoCall ? (
        <div style={styles.container}>
            <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} rtmProps={rtmProps}
                        styleProps={
                            {
                                localBtnContainer: { display: 'flex', flexDirection: 'row',backgroundColor: '#f49e2a', justifyContent: 'space-around', padding: 10 },
                                pinnedVideoContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'space-around', gap: 20, border: '1px solid #f49e2a', padding: 10 },
                                maxViewContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'space-around', gap: 20, border: '1px solid #f49e2a', padding: 10 },
                            }
                        }


            />
        </div>
    ) : (
        <div className={'flex flex-col h-full justify-center items-center gap-5'}>
            <h1 className="text-2xl font-bold text-center text-orange-500 ">Call Ended</h1>
            <Link href="/patient/consultation" className="bg-orange-500 text-white px-4 py-2 rounded-md">Book New Consultation
            </Link>

        </div>
    );
};

const styles = {
    container: { width: '100%', height: '80vh', display: 'flex', backgroundColor: '#fff' },
    heading: { textAlign: 'center', marginBottom: 0 },
    videoContainer: { display: 'flex', flexDirection: 'column', flex: 1 },
    nav: { display: 'flex', justifyContent: 'space-around' },
    btn: { backgroundColor: 'red', cursor: 'pointer', borderRadius: 5, padding: 5, color: '#ffffff', fontSize: 20 },
}

export default Video;

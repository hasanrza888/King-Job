// const appId = 1317996027
//const ServerSecret = 368a370b0878248a8edac3805ee7e996
import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';
import svg from '../../images/island_logo.svg';
import { useNavigate,useParams } from 'react-router-dom';
export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function VideoChat() {
  const {meetingId} = useParams();
  const navigate = useNavigate();
  const {user,isLoggedIn} = useSelector(state=>state.user);
  React.useEffect(()=>{
    if(!user && !isLoggedIn){
      navigate('/login',{state:{referrer:'/videochat/'+meetingId}})
    }
  },[])
      const roomID = meetingId;
      let myMeeting = async (element) => {
     // generate Kit Token
      const appID = 1317996027;
      const serverSecret = "368a370b0878248a8edac3805ee7e996";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  Date.now().toString(),  user?.name);


     // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Meeting Url',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?meeting=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
        showRemoveUserButton:true,
        // branding: {
        //   logoURL: svg // The branding LOGO URL.
        // }
        showRoomTimer: true,
        whiteboardConfig: {
          showAddImageButton:true,
          // It's set to false by default. To use this feature, activate the File Sharing feature, and then import the plugin. Otherwise, this prompt will occur: "Failed to add image, this feature is not supported."
          showCreateAndCloseButton: true, // Whether to display the button that is used to create/turn off the whiteboard. Displayed by default.
          sharedLinks:{
            name:"Meeting"
          }
        },
        maxUsers:2
      });
      
  };

  return (
    <div
      ref={myMeeting}


      style={{ width: '100%', height: '100vh' }}

    ></div>
  );
}
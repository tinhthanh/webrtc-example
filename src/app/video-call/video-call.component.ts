import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

export const ENV_RTCPeerConfiguration = {
  iceServers: [
    {
      urls: "stun:stun1.l.google.com:19302",
    },
    {
      urls: 'turn:14.187.234.193:888',
      username: 'username1',
      credential: 'key1',
    }
  ],
};

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss']
})
export class VideoCallComponent implements AfterViewInit {

  peerConnection = new RTCPeerConnection( ENV_RTCPeerConfiguration);
  @ViewChild('localVideo') localVideo!: ElementRef ;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef ;


  offerSdp = '' ;
  answerSdp = '';

 constructor() {
    
  }
   async ngAfterViewInit() {
    const localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false})
    const remoteStream = new MediaStream();
    this.localVideo.nativeElement.srcObject = localStream;
    this.remoteVideo.nativeElement.srcObject = remoteStream;
    localStream.getTracks().forEach((track) => {
        this.peerConnection.addTrack(track, localStream);
    });

    this.peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
        });
    };
  }

 createOffer = async () => {
   this.peerConnection.onicecandidate = async (event) => {
        //Event that fires off when a new offer ICE candidate is created
        if(event.candidate){
             this.offerSdp = JSON.stringify(this.peerConnection.localDescription)
        }
    };

    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
}

  createAnswer = async () => {

    let offer = JSON.parse(this.offerSdp);

    this.peerConnection.onicecandidate = async (event) => {
        //Event that fires off when a new answer ICE candidate is created
        if(event.candidate){
            console.log('Adding answer candidate...:', event.candidate)
            this.answerSdp = JSON.stringify(this.peerConnection.localDescription)
        }
    };

    await this.peerConnection.setRemoteDescription(offer);

    let answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer); 
}

  addAnswer = async () => {
    console.log('Add answer triggerd')
    let answer = JSON.parse(this.answerSdp);
    console.log('answer:', answer)
    if (!this.peerConnection.currentRemoteDescription){
        this.peerConnection.setRemoteDescription(answer);
    }
}
 }

import { PerspectiveCamera } from 'three';

export class MainCamera {
  public instance: PerspectiveCamera;

  constructor() {
    const aspectRatio = window.innerWidth / window.innerHeight;

    this.instance = new PerspectiveCamera(50, aspectRatio, 0.01, 10);
    this.instance.position.z = 0;
    this.instance.position.x = 0;
    this.instance.position.y = 0;
    this.instance.lookAt(0, 0, 0);
  }
}

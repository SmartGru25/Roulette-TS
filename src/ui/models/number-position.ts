import { BoxGeometry, DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';

export function NumberPosition(number: number, color: string): Mesh {
  const geometry = new BoxGeometry(0.1, 0.02, 0.1);
  const materialParams = {color: color.toLowerCase(), wireframe: false};
  const material = new MeshBasicMaterial(materialParams);
  const mesh = new Mesh(geometry, material);
  mesh.name = `P_${number === 0 ? 'ZERO' : number}`;
  return mesh;
}
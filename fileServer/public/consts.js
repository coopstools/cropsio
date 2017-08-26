numTiles = 7;
tileRadius = 30;
ratio = 0.866;

angle = 1.047; //60 degress in radians

MOVEMENT = {
  MV_UL: {
    x: -1.5 * tileRadius,
    y: -1 * ratio * tileRadius
  },
  MV_U: {
    x: 0,
    y: -1 * 2 * ratio * tileRadius
  },
  MV_UR: {
    x: 1.5 * tileRadius,
    y: -1 * ratio * tileRadius
  },
  MV_DL: {
    x: -1.5 * tileRadius,
    y: ratio * tileRadius
  },
  MV_D: {
    x: 0,
    y: 2 * ratio * tileRadius
  },
  MV_DR: {
    x: 1.5 * tileRadius,
    y: ratio * tileRadius
  }
}

// CPU MuJoCo needs more Newton/line-search iterations than the Warp backend
// for these dense hand contacts. Keep timestep, gains and physical limits intact.
export function configurePhysics(context) {
  context.mjModel.opt.iterations = 100;
  context.mjModel.opt.ls_iterations = 50;
}

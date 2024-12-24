// import User from "../models/UsersModel.js"

// export const verifyUser = async (req, res, next) => {
//     if (!req.session.userId) {
//         return res.status(401).json({ msg: "Mohon Login Terlebih Dahulu" });
//     }
//     const user = await User.findOne({
//         where: {
//             uuid: req.session.userId,
//         },
//     });
//     if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
//     req.userId = user.id;
//     req.role = user.role;
//     console.log("User ID set in middleware:", req.userId); // Tambahkan log ini
//     next();
// }



// export const superAdminOnly = async (req, res, next) => {
//     const user = await User.findOne({
//         where: {
//             uuid: req.session.userId,
//         },
//     });
//     if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
//     if(user.role !== "admin") return res.status(403).json({ msg: "Anda bukan super admin" });
//     req.userId = user.id;
//     req.role = user.role;
//     next();
// }


import User from "../models/UsersModel.js";

export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon Login Terlebih Dahulu" });
    }
    const user = await User.findOne({
        where: { uuid: req.session.userId },
    });
    if (!user) {
        return res.status(404).json({ msg: "User tidak ditemukan" });
    }
    req.userId = user.id;
    req.role = user.role;
    next();
};


export const superAdminOnly = (req, res, next) => {
    if (req.role !== "admin") {
        return res.status(403).json({ msg: "Anda bukan admin" });
    }
    next();
};

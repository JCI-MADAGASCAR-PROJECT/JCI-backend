import {Router} from "express";
import UserRoutes from "./userRoutes.js"
import BNRoutes from "./bnRoutes.js"
import PastPresidentRoutes from "./pastPresidentRoutes.js"
import ZoneRoutes from "./zoneRoutes.js"
import ItemRoutes from "./eCommerceRoutes.js"
import ZonePresidentRoutes from "./zonePresidentRoutes.js"
import OrganisationLocalRoutes from "./organisationLocalRoutes.js"
import OrganisationContentRoutes from "./organisationContentRoutes.js"
import MemberRoutes from "./memberRoutes.js"
import EventRoutes from "./eventRoutes.js"
import EventFilesRoutes from "./eventFilesRoutes.js"
import EventImagesRoutes from "./eventImagesRoutes.js"


const router = Router();

router.use("/api/v1/users",UserRoutes);
router.use("/api/v1/bn",BNRoutes);
router.use("/api/v1/past-presidents",PastPresidentRoutes);
router.use("/api/v1/zones",ZoneRoutes);
router.use("/api/v1/items",ItemRoutes);
router.use("/api/v1/zone/presidents",ZonePresidentRoutes);
router.use("/api/v1/organisation-locales",OrganisationLocalRoutes);
router.use("/api/v1/organisation-locales/contents",OrganisationContentRoutes);
router.use("/api/v1/organisation-locales/members",MemberRoutes);
router.use("/api/v1/events",EventRoutes);
router.use("/api/v1/events/files",EventFilesRoutes);
router.use("/api/v1/events/images",EventImagesRoutes);
    






export default router;
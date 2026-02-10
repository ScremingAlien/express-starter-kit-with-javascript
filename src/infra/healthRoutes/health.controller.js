import { statusCode } from "../../utils/constants/statusCode.js";
import { getHealthReport } from "./health.service.js";

export default class HealthController {
  liveChecker = async (req, res, next) => {
    try {
      res.success(
        "App is running !",
        {
          status: "alive",
          timestamp: new Date().toISOString(),
        },
        statusCode.OK
      );
    } catch (err) {
      next(err);
    }
  };
  reportChecker = async (req, res, next) => {
    try {
      const report = await getHealthReport();

      if (report.status === "healthy") {
        return res.success("App is running !", report, statusCode.OK);
      }

      return res.fail("App is not running !", statusCode.SERVICE_UNAVAILABLE, { report });
    } catch (err) {
      next(err);
    }
  };
  baseChecker = async (req, res, next) => {
    try {
      const report = await getHealthReport();

      if (report.status === "unhealthy") {
        return res.fail("App is not running !", statusCode.SERVICE_UNAVAILABLE, { report });
      }

      res.success(
        "App is running !",
        {
          status: "alive",
          report,
        },
        statusCode.OK
      );
    } catch (err) {
      next(err);
    }
  };
}

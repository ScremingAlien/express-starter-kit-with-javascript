export function responseFormatter(req, res, next) {
     res.success = (data, statusCode = 200) => {
          res.status(statusCode).json({
               success: true,
               timestamp: new Date().toISOString(),
               data: data,
          });
     };

     res.fail = (message, statusCode = 400, ...kwargs) => {
          res.status(statusCode).json({
               success: false,
               message: message,
               timestamp: new Date().toISOString(),
               route: req.originalUrl,
               ...kwargs[0],
          });
     };
     
     next();
}

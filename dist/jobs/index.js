"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_cron_1 = __importDefault(require("node-cron"));
var s3_1 = __importDefault(require("../config/s3"));
var services_1 = require("../services");
var AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
var deleteOldFiles = function (files) {
    if (!files)
        return;
    var oldFiles = files.filter(function (file) {
        var LastModified = file === null || file === void 0 ? void 0 : file.LastModified;
        var now = new Date();
        var difference = now.getTime() - ((LastModified === null || LastModified === void 0 ? void 0 : LastModified.getTime()) || 0);
        var treeMonthsInMilliseconds = 1000 * 60 * 60 * 24 * 30 * 3;
        return difference > treeMonthsInMilliseconds;
    });
    oldFiles.forEach(function (file) {
        var Key = file === null || file === void 0 ? void 0 : file.Key;
        if (!Key)
            return;
        s3_1.default.deleteObject({
            Key: Key,
            Bucket: AWS_S3_BUCKET,
        }).promise();
    });
};
node_cron_1.default.schedule('0 6 * * *', function () {
    services_1.logger.info('Running job delete old files');
    var bucketParams = {
        Bucket: AWS_S3_BUCKET,
    };
    s3_1.default.listObjects(bucketParams, function (err, data) {
        if (err) {
            services_1.logger.error("Error: ".concat(err));
        }
        else {
            deleteOldFiles(data.Contents);
        }
    });
});

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const courseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    small_description: {
        type: String,
        required: true,
        trim: true,
    },
    large_description: {
        type: String,
        required: true,
        trim: true,
    },
    students: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 5,
        min: 0,
        max: 5,
    },
    image: {
        type: String,
        required: true,
    },
    features: {
        type: [String],
        default: [],
    },
    curriculum: {
        type: [String],
        default: [],
    },
    // NEW SECTION DATA
    what_you_will_learn: {
        type: [String],
        default: [],
    },
    course_highlights: {
        type: [String],
        default: [],
    },
    target_students: {
        type: [String],
        default: [],
    },
    requirements: {
        type: [String],
        default: [],
    },
    exam_features: {
        type: [String],
        default: [],
    },
    total_mock_tests: {
        type: Number,
        default: 0,
    },
    total_mcq: {
        type: Number,
        default: 0,
    },
    // Pricing (optional but recommended)
    price: {
        type: Number,
        default: 0,
    },
    discount_price: {
        type: Number,
        default: 0,
    },
    badge: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});
exports.Course = mongoose_1.default.model('Course', courseSchema);

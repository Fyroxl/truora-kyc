/**
 * Represents the request to create the identity instance in the endpoint API.
 */
export interface CreateValidationRequest {
    type: string;
    country: string;
    document_type: string;
    user_authorized: boolean;
}


/**
 * Represents the response to create the identity instance in the endpoint API.
 */
export interface CreateValidationResponse {
    validation_id: string;
    ip_address: string;
    account_id: string;
    type: CreateValidationType;
    validation_status: CreateValidationStatus;
    creation_date: string;
    instructions: {
        front_url: string;
        reverse_url: string;
    };
}

enum CreateValidationType {
    DocumentValidation = 'document-validation'
}

enum CreateValidationStatus {
    Pending = 'pending',
    Success = 'success',
    Failure = 'failure'
}

/**
 * Represents the request to get the identity instance in the endpoint API.
 */
export interface GetValidationIndentityRequest {
    validationId: string;
}

/**
 * Represents the identity validation response from the endpoint API.
 */
export interface GetValidationIndentityResponse {
    ip_address: string;
    account_id: string;
    type: GetValidationType;
    creation_date: Date;
    validation_id: string;
    validation_status: GetValidationStatus;
    failure_status?: GetValidationFailureStatus;
    declined_reason?: string;
    expired_reason?: GetValidationExpiredReason;
    details?: Details;
    processing_start_date?: Date;
    processing_finish_date?: Date;
    document_id?: String;
    background_check?: BackgroundCheck;
    user_response?: UserResponse;
    attachment_status?: GetValidationAttachmentStatus;
    attachment_validations?: AttachmentValidation[];
    custom_type?: string;
}

enum GetValidationType {
    IdentityQuestions = 'identity-questions',
    FaceRecognition = 'face-recognition',
    VoiceRecognition = 'voice-recognition',
    EmailVerification = 'email-verification',
    PhoneVerification = 'phone-verification',
    DocumentValidation = 'document-validation'
}

enum GetValidationStatus {
    Pending = 'pending',
    Success = 'success',
    Failure = 'failure'
}

enum GetValidationFailureStatus {
    Declined = 'declined',
    Expired = 'expired',
    SystemError = 'system_error'
}

enum GetValidationExpiredReason {
    InputFileNotUploaded = 'input_file_not_uploaded',
    ManualReviewExpired = 'manual_review_expired',
    PendingValidationMethods = 'pending_validation_methods'
}

enum GetValidationAttachmentStatus {
    Valid = 'valid',
    Invalid = 'invalid',
    Pending = 'pending'
}

interface Details {
    document_details?: DocumentDetails;
    document_validations?: DocumentValidations;
}

interface DocumentDetails {
    birth_place?: string;
    country?: DocumentCountryCode;
    date_of_birth?: Date;
    document_number?: string;
    document_type?: string;
    expedition_date?: string;
    expedition_place?: string;
    expiration_date?: string;
    gender?: DocumentGender;
    height?: string;
    issue_date?: Date;
    last_name?: string;
    first_last_name?: string;
    second_last_name?: string;
    municipality?: string;
    name?: string;
    postal_code?: string;
    residence_address?: string;
    rh?: string;
    section?: string;
    state?: string;
    status?: String;
    voter_id?: string;
    validation_status?: DocumentValidationStatus;
}

enum DocumentCountryCode {
    Colombia = 'co',
    Venezuela = 've',
    Chile = 'cl',
    Mexico = 'mx',
    Peru = 'pe',
    DominicanRepublic = 'do',
    ElSalvador = 'sv',
    Guatemala = 'gt',
    Bolivia = 'bo',
    CostaRica = 'cr',
    Ecuador = 'ec',
    Panama = 'pa',
    Argentina = 'ar',
    All = 'all',
    Brazil = 'br'
}

enum DocumentGender {
    Male = 'male',
    Female = 'female'
}

enum DocumentValidationStatus {
    Completed = 'completed',
    InProgress = 'in_progress',
    Pending = 'pending',
    Failed = 'failed',
    NotStarted = 'not_started'
}

interface DocumentValidations {
    data_consistency?: DataConsistencyValidation[];
    government_database?: GovernmentDatabaseValidation[];
    image_analysis?: ImageAnalysisValidation[];
    photocopy_analysis?: PhotocopyAnalysisValidation[];
    manual_review?: ManualReviewValidation[];
}

interface DataConsistencyValidation {
    validation_name: string;
    result: DocumentValidationResult;
    validation_type: string;
    message: string;
}

interface GovernmentDatabaseValidation {
    validation_name: string;
    result: DocumentValidationResult;
    validation_type: string;
    message: string;
}

interface ImageAnalysisValidation {
    validation_name: string;
    result: DocumentValidationResult;
    validation_type: string;
    message: string;
}

interface PhotocopyAnalysisValidation {
    validation_name: string;
    result: DocumentValidationResult;
    validation_type: string;
    message: string;
}

interface ManualReviewValidation {
    validation_name: string;
    result: DocumentValidationResult;
    validation_type: string;
    message: string;
}

enum DocumentValidationResult {
    Valid = 'valid',
    Invalid = 'invalid'
}

interface BackgroundCheck {
    check_id: string;
    check_url: string;
}

interface UserResponse {
    input_files: string[];
}

interface AttachmentValidation {
    validation_name: string;
    validation_type: AttachmentValidationType;
    attachment_type: AttachmentAttachmentType;
    result: string;
}

enum AttachmentValidationType {
    OcrValidation = 'ocr-validation',
    FaceDetectioValidation = 'face-detection-validation',
    FaceClarityValidation = 'face-clarity-validation'
}

enum AttachmentAttachmentType {
    DocumentFront = 'document-front',
    DocumentReverse = 'document-reverse'
}
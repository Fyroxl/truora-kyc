import {
    CreateValidationRequest,
    CreateValidationResponse,
    GetValidationIndentityRequest,
    GetValidationIndentityResponse
} from "../interfaces/documentValidation";
import { UploadImageRequest } from "../interfaces/imageUpload";

export default function documentValidation() {
    const createValidation = async ({ type, country, document_type, user_authorized }: CreateValidationRequest): Promise<CreateValidationResponse> => {
        try {
            const headers = new Headers({
                'Truora-API-Key': import.meta.env.VITE_TRUORA_API_KEY,
                'Content-Type': 'application/x-www-form-urlencoded',
            });

            const body = new URLSearchParams({
                type,
                country,
                document_type,
                user_authorized: String(user_authorized),
            });

            const response = await fetch('https://api.validations.truora.com/v1/validations', {
                method: 'POST',
                headers: headers,
                body: body,
            });

            if (!response.ok) {
                throw new Error(`HTTP error status in request create validation: ${response.status}`);
            }

            const res: CreateValidationResponse = await response.json();
            return res;
        } catch (error) {
            throw new Error("Error creating the identity validation instance");
        }
    };

    const uploadImage = async ({ url, image }: UploadImageRequest) => {
        try {
            const proxyUrl =
                "/proxy-upload" + new URL(url).pathname + new URL(url).search;

            const headers = new Headers({
                "Content-Type": 'image/jpeg' || 'image/png' || 'image/pjg',
            });

            const response = await fetch(proxyUrl, {
                method: "PUT",
                body: image,
                headers: headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error status in request upload validation image: ${response.status}`);
            }
        } catch (error) {
            throw new Error("Error uploading the identity validation image");
        }
    };

    const getValidationResult = async ({ validationId }: GetValidationIndentityRequest): Promise<GetValidationIndentityResponse> => {
        try {
            const headers = new Headers({
                'Truora-API-Key': import.meta.env.VITE_TRUORA_API_KEY
            });

            const response = await fetch(
                `https://api.validations.truora.com/v1/validations/${validationId}`,
                {
                    method: "GET",
                    headers: headers
                }
            );

            const res: GetValidationIndentityResponse = await response.json();
            return res;
        } catch (error) {
            throw new Error("Error obtaining identity validation");
        }
    };

    return {
        createValidation,
        uploadImage,
        getValidationResult
    };
}
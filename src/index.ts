import { bulkDeleteItems, createItem, deleteItemWithUuid, getAllItems, getItemWithUuid, getItemsByids, getItemsCountWithFilter, getItemsWithFilter, sendEmail, updateItemWithUuid } from "./methods/methods";
export class DrapcodeApis {
    private project_seo_name: string;
    private xApiKey: string;
    private authorization: string; //authorization
    private environment: string;
    private API_PATH = 'drapcode.io/api/v1/developer';

    constructor(project_seo_name: string, xApiKey: string = "", authorization: string = "", environment: string = 'PRODUCTION') {
        this.project_seo_name = project_seo_name;
        this.xApiKey = xApiKey;
        this.authorization = authorization;
        this.environment = environment
    }
    private getBaseUrl(): string {
        switch (this.environment) {
            case 'PRODUCTION':
                return `https://${this.project_seo_name}.api.${this.API_PATH}`;
            case 'PREVIEW':
                return `https://${this.project_seo_name}.preview.${this.API_PATH}`;
            case 'BETA':
                return `https://${this.project_seo_name}.beta.${this.API_PATH}`;
            case 'ALPHA':
                return `https://${this.project_seo_name}.alpha.${this.API_PATH}`;
            default:
                return `https://${this.project_seo_name}.api.${this.API_PATH}`;
        }
    }
    private getHeaders(): Record<string, string> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        if (this.xApiKey) {
            headers['x-api-key'] = this.xApiKey;
        }
        if (this.authorization) {
            headers['Authorization'] = this.authorization;
        }
        return headers;
    }


    async getAllItems(collectionName: string): Promise<any> {
        return getAllItems(this.getBaseUrl(), this.getHeaders(), collectionName);
    }
    async createItem(collectionName: string, body: any): Promise<any[]> {
        return createItem(this.getBaseUrl(), this.getHeaders(), collectionName, body);
    }
    async getItemsWithFilter(collectionName: string, filterUuid: string): Promise<any[]> {
        return getItemsWithFilter(this.getBaseUrl(), this.getHeaders(), collectionName, filterUuid,);
    }
    async getItemsCountWithFilter(collectionName: string, filterUuid: string): Promise<any[]> {
        return getItemsCountWithFilter(this.getBaseUrl(), this.getHeaders(), collectionName, filterUuid);
    }
    async getItemWithUuid(collectionName: string, itemUuid: string): Promise<any[]> {
        return getItemWithUuid(this.getBaseUrl(), this.getHeaders(), collectionName, itemUuid);
    }
    async updateItemWithUuid(collectionName: string, itemUuid: string, body: any): Promise<any[]> {
        return updateItemWithUuid(this.getBaseUrl(), this.getHeaders(), collectionName, itemUuid, body);
    }
    async deleteItemWithUuid(collectionName: string, itemUuid: string): Promise<any[]> {
        return deleteItemWithUuid(this.getBaseUrl(), this.getHeaders(), collectionName, itemUuid);
    }
    async bulkDeleteItems(collectionName: string, body: any): Promise<any[]> {
        return bulkDeleteItems(this.getBaseUrl(), this.getHeaders(), collectionName, body);
    }
    async getItemsByids(collectionName: string, body: any): Promise<any[]> {
        return getItemsByids(this.getBaseUrl(), this.getHeaders(), collectionName, body);
    }
    async sendEmail(templateId: string, sendTo: string): Promise<any[]> {
        return sendEmail(this.getBaseUrl(), this.getHeaders(), templateId, sendTo)
    }
}
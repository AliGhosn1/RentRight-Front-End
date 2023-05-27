export interface CustomButtonProps {
    type?: string,
    title: string,
    backgroundColor: string,
    color: string,
    fullWidth?: boolean,
    icon?: ReactNode,
    disabled?: boolean,
    handleClick?: () => void
}

export interface ProfileProps {
    type: string,
    name: string,
    avatar: string,
    email: string,
    properties: Array | undefined
    number: string,
    address: string
}

export interface PropertyProps {
    _id: string,
    title: string,
    description: string,
    location: string,
    price: string,
    photo: string,
    creator: string
}

export interface FormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    handleImageChange: (file) => void,
    onFinishHandler: (data: FieldValues) => Promise<void> | void,
    propertyImage: { name: string, url: string },
}

export interface PropertyReferralsProps {
    propertyTypes: [
        {title: string, percentage: number, color: string}, 
        {title: string, percentage: number, color: string}, 
        {title: string, percentage: number, color: string}, 
        {title: string, percentage: number, color: string}, 
        {title: string, percentage: number, color: string}
    ]
}

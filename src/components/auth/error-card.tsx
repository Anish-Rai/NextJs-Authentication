import { BsExclamationTriangle } from "react-icons/bs"
import CardWrapper from "./card-wrapper"

const ErrorCard = () => {
  return (
    <CardWrapper
        headerLabel="Oops something went wrong!"
        backButtonHref="/auth/login"
        backButtonLabel="Click here to go back to login page"
        
    >
        <div className="flex items-center justify-center w-full">
            <BsExclamationTriangle className="text-destructive" />
        </div>
    </CardWrapper>
  )
}

export default ErrorCard
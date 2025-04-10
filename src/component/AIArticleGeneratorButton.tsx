import { askGPT } from "../utils/openai"
import { New } from "../model/New"
import styles from "./aIArticleGeneratorButton.module.css"
import { useTransition } from "react"
import { LoadingButton } from "./LoadingButton"

export const AIArticleGeneratorButton = ({
  formValues,
  setFormValues,
}: {
  formValues: New
  setFormValues: React.Dispatch<React.SetStateAction<New>>
}) => {
  const [loading, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      const response: string | null = await askGPT(
        formValues.title,
        formValues.picture
      )
      setFormValues((prev: New) => {
        const updatedValues: New = { ...prev, content: response || "" }
        return new New(
          updatedValues.title,
          updatedValues.picture,
          updatedValues.content
        )
      })
    })
  }

  return (
    <button
      disabled={loading}
      className={styles.button}
      type="button"
      onClick={handleClick}
    >
      {loading ? (
        <LoadingButton />
      ) : (
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2802_698)">
            <path
              d="M24.5 11C24.5 11 24.1992 8.1719 23.0117 6.9883C21.8203 5.8086 19 5.5 19 5.5C19 5.5 21.8281 5.19922 23.0117 4.0117C24.1914 2.8203 24.5 0 24.5 0C24.5 0 24.8008 2.8281 25.9883 4.0117C27.168 5.1914 30 5.5 30 5.5C30 5.5 27.1719 5.80078 25.9883 6.9883C24.8086 8.168 24.5 11 24.5 11ZM11.25 7.5C11.25 7.5 10.6289 13.2891 8.2109 15.7109C5.789 18.1328 0 18.75 0 18.75C0 18.75 5.7891 19.3711 8.2109 21.7891C10.6328 24.211 11.25 30 11.25 30C11.25 30 11.8711 24.2109 14.2891 21.7891C16.711 19.3672 22.5 18.75 22.5 18.75C22.5 18.75 16.7109 18.1289 14.2891 15.7109C11.8672 13.289 11.25 7.5 11.25 7.5ZM25.75 25C25.0586 25 24.5 25.5586 24.5 26.25C24.5 26.9414 25.0586 27.5 25.75 27.5C26.4414 27.5 27 26.9414 27 26.25C27 25.5586 26.4414 25 25.75 25ZM3.75 6C4.44141 6 5 5.44141 5 4.75C5 4.05859 4.44141 3.5 3.75 3.5C3.05859 3.5 2.5 4.05859 2.5 4.75C2.5 5.44141 3.05859 6 3.75 6Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_2802_698">
              <rect width="30" height="30" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
    </button>
  )
}

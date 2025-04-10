import "./loadingButton.css"

export const LoadingButton = ({ isFixed = false }) => {
  return (
    <div className={`${"loadingSpin"} ${isFixed ? "fixed" : "absolute"}`}>
      <div></div>
    </div>
  )
}

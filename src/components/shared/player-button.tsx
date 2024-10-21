type PlayerButtonProps = {
  children: React.ReactElement
  ariaLabel: string
  onClickHandler: () => void
}

export const PlayerButton = ({ children: icon, ariaLabel, onClickHandler }: PlayerButtonProps) => {
  return (
    <>
      <button aria-label={ariaLabel} onClick={onClickHandler}>
        {icon}
      </button>
    </>
  )
}

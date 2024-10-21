type LoaderProps = {
  title: string
}

export const Loader = ({ title }: LoaderProps) => {
  return <p className="animate-pulse">{`${title}...`}</p>
}

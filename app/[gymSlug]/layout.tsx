type Props = {
    children: React.ReactNode;
}

export default function layout({children}: Props) {

    // check whether a gym exists and if exists continue if not throw an error

  return (
    <div>{children}</div>
  )
}
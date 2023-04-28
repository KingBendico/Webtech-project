interface Props {
    to:string | URL | null | undefined,
    children:String
}

export default function NavigateButton(props: Props) {
    const NavigateTo = () => {
        window.history.pushState({}, '', props.to);
        window.dispatchEvent(new PopStateEvent('popstate'));
    }

  return (
    <>
        <button onClick={NavigateTo}>{props.children}</button>
    </>
  );
}

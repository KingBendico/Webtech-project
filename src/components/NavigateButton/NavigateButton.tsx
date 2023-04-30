interface Props {
  to: string | URL | null | undefined;
  children: string;
  id?: string;
}

export default function NavigateButton(props: Props) {
  const NavigateTo = () => {
    window.history.pushState({}, "", props.to);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <>
      <button id={props.id} onClick={NavigateTo}>
        {props.children}
      </button>
    </>
  );
}

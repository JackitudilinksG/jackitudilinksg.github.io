export async function getServerSideProps(context) {
    const result = 'Hello World';
    return { props: { result } };
  }
  
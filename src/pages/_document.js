import { Html, Head, Main, NextScript } from "next/document";
function _document() {
   return (
      <Html lang="en">
         <Head>
            <link
               rel="stylesheet"
               href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
               integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
               crossorigin="anonymous"
               referrerpolicy="no-referrer"
            />
            <link
               rel="stylesheet"
               href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css"
            ></link>
         </Head>
         <body>
            <Main />
            <NextScript />
         </body>
      </Html>
   );
}

export default _document;

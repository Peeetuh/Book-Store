import { useState } from "react";

const UserCart = ({username}) => {
    const [checkedOut, setCheckkout] = useState(false)
    
    return (
      <main>
        <h2>{username} Checkout</h2>
      </main>
    );
  }

  export default UserCart;
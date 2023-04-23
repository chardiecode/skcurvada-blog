import { useState, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";

const Comment = () => {
  const [showComment, setShowComment] = useState(false);
  return (
    <Transition.Root show={showComment} as={Fragment}>
      <Dialog onClose={() => setShowComment(false)}></Dialog>
    </Transition.Root>
  );
};

export default Comment;

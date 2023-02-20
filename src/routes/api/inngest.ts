import { serve } from "inngest/solid";
import { inngest } from "~/inngest/client";
import fns from "../../inngest";

export const { GET, POST, PUT } = serve(inngest, fns);

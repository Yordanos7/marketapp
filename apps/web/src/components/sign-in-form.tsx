import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import Loader from "./loader";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import GoogleIcon from "@mui/icons-material/Google";

export default function SignInForm({
	onSwitchToSignUp,
}: {
	onSwitchToSignUp: () => void;
}) {
	const router = useRouter();
	const { isPending } = authClient.useSession();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			await authClient.signIn.email(
				{
					email: value.email,
					password: value.password,
				},
				{
					onSuccess: () => {
						router.push("/dashboard");
						toast.success("Sign in successful");
					},
					onError: (error) => {
						toast.error(error.error.message || error.error.statusText);
					},
				},
			);
		},
		validators: {
			onSubmit: z.object({
				email: z.string().email("Invalid email address"),
				password: z.string().min(8, "Password must be at least 8 characters"),
			}),
		},
	});

	if (isPending) {
		return <Loader />;
	}

	const signInWithGoogle = async () => {
		try {
			await authClient.signIn.social({
				provider: "google",
			});
		} catch (error) {
			toast.error("Google sign-in failed. Please try again.");
		}
	};

	return (
		<div className="mx-auto w-full max-w-md p-8 mt-10 dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-lg">
			<h1 className="mb-6 text-center text-2xl  dark:text-white font-extrabold ">
				Welcome Back
			</h1>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className="space-y-5"
			>
				{/* Email Field */}
				<form.Field name="email">
					{(field) => (
						<div className="space-y-2">
							<Label htmlFor={field.name} className="text-sm font-medium dark:text-gray-300">
								Email Address
							</Label>
							<Input
								id={field.name}
								name={field.name}
								type="email"
								placeholder="you@example.com"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
							{field.state.meta.errors?.length > 0 && (
								<div className="text-sm text-red-500">
									{field.state.meta.errors.map((err, i) => (
										<div key={i}>{err?.message}</div>
									))}
								</div>
							)}
						</div>
					)}
				</form.Field>

				{/* Password Field */}
				<form.Field name="password">
					{(field) => (
						<div className="space-y-2">
							<Label htmlFor={field.name} className="text-sm font-medium dark:text-gray-300">
								Password
							</Label>
							<Input
								id={field.name}
								name={field.name}
								type="password"
								placeholder="••••••••"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
							{field.state.meta.errors?.length > 0 && (
								<div className="text-sm text-red-500">
									{field.state.meta.errors.map((err, i) => (
										<div key={i}>{err?.message}</div>
									))}
								</div>
							)}
						</div>
					)}
				</form.Field>

				{/* Submit Button */}
				<form.Subscribe>
					{(state) => (
						<Button
							type="submit"
							disabled={!state.canSubmit || state.isSubmitting}
							className="w-full py-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
						>
							{state.isSubmitting ? "Signing In..." : "Sign In"}
						</Button>
					)}
				</form.Subscribe>

				{/* Divider */}
				<div className="relative flex items-center my-6">
					<div className="flex-grow border-t border-gray-300"></div>
					<span className="px-4 text-sm dark:text-gray-300">or continue with</span>
					<div className="flex-grow border-t border-gray-300"></div>
				</div>

				{/* Google Sign In */}
				<Button
					type="button"
					onClick={signInWithGoogle}
					variant="outline"
					className="w-full py-3 flex items-center justify-center gap-3 border border-gray-300 dark:text-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
				>
					<GoogleIcon className="w-5 h-5" />
					<span>Sign in with Google</span>
				</Button>
			</form>

			{/* Sign Up Link */}
			<div className="mt-6 text-center">
				<p className="text-sm dark:text-gray-300">
					Don’t have an account?{" "}
					<button
						type="button"
						onClick={onSwitchToSignUp}
						className="font-medium text-indigo-600 hover:text-indigo-800 focus:outline-none"
					>
						Sign Up
					</button>
				</p>
			</div>
		</div>
	);
}
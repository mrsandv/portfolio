import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type TMode = 'fun' | 'normal';

type THomerProps = {
	toggleMode: (mode: TMode) => void;
};
const HomerMode = ({ toggleMode }: THomerProps) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [muted, setMuted] = useState(false);

	useEffect(() => {
		const sound = document.createElement('audio');
		sound.id = 'audio';
		sound.src = '/homer/backsound.mp3';
		sound.controls = false;
		sound.loop = true;
		document.body.appendChild(sound);
		audioRef.current = sound;

		const timer = setTimeout(() => {
			sound.play().catch((err) => {
				console.warn('No se pudo reproducir el audio:', err);
			});
		}, 2700);

		return () => {
			clearTimeout(timer);
			sound.pause();
			sound.remove();
		};
	}, []);

	const toggleMute = () => {
		const sound = audioRef.current;
		if (!sound) return;
		const newMuted = !muted;
		sound.muted = newMuted;
		setMuted(newMuted);
	};

	return (
		<div
			className={
				'm-0 p-5 w-screen h-screen bg-[#78bbcb] flex flex-col items-center justify-center select-none font-[--cooper-font]'
			}
		>
			<div className="flex flex-col justify-center items-center w-3/5">
				<h1 className="text-7xl text-center my-5">Marco's Web Page</h1>
				<div className="flex justify-between w-4/5">
					<button
						type="button"
						className="bg-zinc-500 shadow-2xl w-40 border-2 border-zinc-400 cursor-pointer hover:bg-zinc-400"
						onClick={toggleMute}
					>
						{muted ? '🔇 Activar sonido' : '🔊 Silenciar'}
					</button>
					<button
						type="button"
						className="bg-zinc-500 shadow-2xl w-40 border-4 border-zinc-400"
						onClick={() => {
							toggleMode('normal');
						}}
					>
						Regresar a la versión sería
					</button>
				</div>
				<Image
					alt="clock animation"
					className="self-start"
					src="/homer/reloj.gif"
					unoptimized
					width={60}
					height={60}
				/>
			</div>
			<div className="flex justify-between w-3/5 h-3/4">
				<div className="grid grid-cols-2 w-1/3">
					<Image
						unoptimized
						alt="worm animation"
						src="/homer/worm.gif"
						width={100}
						height={100}
					/>
					<Image
						unoptimized
						alt="toaster animation"
						src="/homer/toaster.gif"
						width={90}
						height={90}
					/>
					<Image
						unoptimized
						alt="toaster animation"
						src="/homer/toaster.gif"
						width={125}
						height={125}
					/>
					<Image
						unoptimized
						alt="mouth animation"
						src="/homer/mouth.gif"
						width={130}
						height={130}
					/>
					<Image
						unoptimized
						alt="bell animation"
						src="/homer/ring.gif"
						width={100}
						height={100}
					/>
					<Image
						unoptimized
						alt="clock animation"
						src="/homer/reloj.gif"
						width={70}
						height={70}
					/>
					<Image
						unoptimized
						alt="worm animation"
						src="/homer/worm.gif"
						width={100}
						height={100}
					/>
				</div>
				<div className="flex items-center justify-center w-1/3">
					<Image
						unoptimized
						alt="Jesus dancing"
						src="/homer/jesus.gif"
						width={270}
						height={270}
					/>
				</div>
				<div className="grid grid-cols-2 w-1/3">
					<Image
						unoptimized
						alt="worm animation"
						src="/homer/worm.gif"
						width={100}
						height={100}
					/>
					<Image
						unoptimized
						alt="toaster animation"
						src="/homer/toaster.gif"
						width={120}
						height={120}
					/>
					<Image
						unoptimized
						alt="bell animation"
						src="/homer/ring.gif"
						width={70}
						height={70}
					/>
					<Image
						unoptimized
						alt="mouth animation"
						src="/homer/mouth.gif"
						width={130}
						height={130}
					/>
					<Image
						unoptimized
						alt="toaster animation"
						src="/homer/toaster.gif"
						width={70}
						height={70}
					/>
					<Image
						unoptimized
						alt="clock animation"
						src="/homer/reloj.gif"
						width={120}
						height={120}
					/>
				</div>
			</div>
			<div className="flex w-3/5">
				<Image
					unoptimized
					alt="worm animation"
					src="/homer/worm.gif"
					width={120}
					height={120}
				/>
				<Image
					unoptimized
					alt="worm animation"
					src="/homer/worm.gif"
					className="w-24"
					width={100}
					height={100}
				/>
			</div>

			<a
				className="my-5 "
				href="https://github.com/franciscominen"
				target="_blank"
				rel="noopener noreferrer"
			>
				Kudos to github.com/franciscominen, i just adapt his work to a react
				version
			</a>
		</div>
	);
};

export default HomerMode;

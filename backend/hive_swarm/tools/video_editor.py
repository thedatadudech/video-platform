import sys
import os
from moviepy.editor import (
    VideoFileClip,
    concatenate_videoclips,
    CompositeVideoClip,
    vfx,
)


# Function for Slide Transition
def apply_slide(clip, duration=1, direction="left"):
    # Calculate the offset for the slide based on direction
    if direction == "left":
        offset = (-clip.w, 0)
    elif direction == "right":
        offset = (clip.w, 0)
    elif direction == "up":
        offset = (0, -clip.h)
    elif direction == "down":
        offset = (0, clip.h)
    else:
        raise ValueError(
            "Invalid direction. Choose from 'left', 'right', 'up', 'down'."
        )

    # Create a composite clip with the slide effect
    slide_clip = CompositeVideoClip(
        [
            clip.set_position(
                lambda t: (
                    offset[0] * (1 - t / duration),
                    offset[1] * (1 - t / duration),
                )
            )
        ],
        size=clip.size,
    ).set_duration(duration)

    # Concatenate the slide effect with the original clip
    return concatenate_videoclips([slide_clip, clip.set_start(duration)])


# Function for Zoom Transition
def apply_zoom(clip, zoom_factor=1.2, duration=1):
    return (
        clip.fx(vfx.resize, zoom_factor)
        .set_duration(duration)
        .crossfadein(duration)
        .crossfadeout(duration)
    )


def video_editor(
    video_files: list[str],
    output_filename: str,
    transition_type=None,
    video_format="normal",
    transition_duration=1,
):
    """
    This function takes a list of video files, resizes and crops them to fit YouTube Shorts dimensions, and concatenates them into a single video file.

    :param video_files: A list of paths to video files.
    :param output_filename: The path to the output video file.
    :return: The path to the output video file.
    """

    clips = []
    for video in video_files:
        print(video)
        try:
            # Load the video file
            clip = VideoFileClip(video)

            # Set target dimensions for YouTube Shorts
            target_width = 1080
            target_height = 1920

            # Determine the scaling factor to cover the target dimensions
            clip_width, clip_height = clip.size
            width_ratio = target_width / clip_width
            height_ratio = target_height / clip_height
            scaling_factor = max(width_ratio, height_ratio)

            # Resize the clip to cover the target area
            clip_resized = clip.resize(height=int(clip.h * scaling_factor))

            # Center crop the clip to target dimensions
            if video_format == "youtube":
                clip_cropped = clip_resized.crop(
                    x_center=clip_resized.w / 2,
                    y_center=clip_resized.h / 2,
                    width=target_width,
                    height=target_height,
                )
            else:
                clip_cropped = clip_resized

            # Optionally limit the clip duration to 60 seconds
            # clip_cropped = clip_cropped.subclip(0, min(clip_cropped.duration, 60))
            if transition_type == "fade":
                clips.append(clip_cropped.crossfadeout(transition_duration))
            elif transition_type == "slide":
                clips.append(
                    apply_slide(
                        clip_cropped, duration=transition_duration, direction="left"
                    )
                )
            elif transition_type == "zoom":
                clips.append(
                    apply_zoom(
                        clip_cropped, zoom_factor=1.2, duration=transition_duration
                    )
                )
            else:
                clips.append(clip_cropped)  # No transition if type is not recognized

        except Exception as e:
            print(f"Error processing {video}: {e}")
            continue

    if not clips:
        print("No valid video clips were processed.")
        sys.exit(1)

    # Concatenate clips
    final_clip = concatenate_videoclips(clips, method="compose")

    # Write the final video file
    final_clip.write_videofile(
        output_filename,
        fps=30,
        codec="libx264",
        audio_codec="aac",
        preset="medium",
        threads=4,
    )

    return os.path.abspath(output_filename)

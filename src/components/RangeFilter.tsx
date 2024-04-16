import {
  Checkbox,
  Fieldset,
  Group,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { VocalRangeFilter } from "../types";

interface Props {
  voicingFilter: VocalRangeFilter;
  setVoicingFilter: React.Dispatch<React.SetStateAction<VocalRangeFilter>>;
}

const RangeFilter: React.FC<Props> = ({ voicingFilter, setVoicingFilter }) => {
  const form = useForm({
    initialValues: {
      soprano: {
        enabled: voicingFilter.soprano.enabled,
        low: voicingFilter.soprano.low,
        high: voicingFilter.soprano.high,
      },
      alto: {
        enabled: voicingFilter.alto.enabled,
        low: voicingFilter.alto.low,
        high: voicingFilter.alto.high,
      },
      tenor: {
        enabled: voicingFilter.tenor.enabled,
        low: voicingFilter.tenor.low,
        high: voicingFilter.tenor.high,
      },
      bass: {
        enabled: voicingFilter.bass.enabled,
        low: voicingFilter.bass.low,
        high: voicingFilter.bass.high,
      },
    },
    validate: {
      soprano: (value) => {
        if (value.enabled) {
          if (value.low && value.high) {
            if (value.low.note > value.high.note) {
              return "Low note must be lower than high note";
            }
          }
        }
      },
      alto: (value) => {
        if (value.enabled) {
          if (value.low && value.high) {
            if (value.low.note > value.high.note) {
              return "Low note must be lower than high note";
            }
          }
        }
      },
      tenor: (value) => {
        if (value.enabled) {
          if (value.low && value.high) {
            if (value.low.note > value.high.note) {
              return "Low note must be lower than high note";
            }
          }
        }
      },
      bass: (value) => {
        if (value.enabled) {
          if (value.low && value.high) {
            if (value.low.note > value.high.note) {
              return "Low note must be lower than high note";
            }
          }
        }
      },
    },
  });

  const handleOnSubmit = () => {
    setVoicingFilter({
      soprano: {
        enabled: form.values.soprano.enabled,
        low: form.values.soprano.low,
        high: form.values.soprano.high,
      },
      alto: {
        enabled: form.values.alto.enabled,
        low: form.values.alto.low,
        high: form.values.alto.high,
      },
      tenor: {
        enabled: form.values.tenor.enabled,
        low: form.values.tenor.low,
        high: form.values.tenor.high,
      },
      bass: {
        enabled: form.values.bass.enabled,
        low: form.values.bass.low,
        high: form.values.bass.high,
      },
    });
  };

  // const noteIsHigher = (note1: NotePitch, note2: NotePitch) => {
  //   if (note1.octave > note2.octave) {
  //     return true;
  //   } else if (note1.octave === note2.octave) {
  //     return
  //   } else {
  //     return false;
  //   }
  // }

  return (
    <form onSubmit={form.onSubmit(handleOnSubmit)}>
      <Group>
        <Fieldset legend="Low">
          <Checkbox label="S" {...form.getInputProps("soprano.enabled")} />
          <NumberInput {...form.getInputProps("soprano.low.octave")} />
          <TextInput {...form.getInputProps("soprano.low.note")} />
        </Fieldset>
      </Group>
    </form>
  );
};

export default RangeFilter;

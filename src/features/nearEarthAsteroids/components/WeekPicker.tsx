// Adapted from the MUI documentation example:
// https://mui.com/x/react-date-pickers/date-calendar/#week-picker

import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import type { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import IconButton from '@mui/material/IconButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ClickAwayListener from '@mui/material/ClickAwayListener';

dayjs.extend(isBetweenPlugin);

interface CustomPickerDayProps extends PickersDayProps {
  isSelected: boolean;
  isHovered: boolean;
}

type WeekPickerProps = {
  queryWeek?: Dayjs;
  setQueryWeek: (date: Dayjs) => void;
};

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})<CustomPickerDayProps>(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.primary.light,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.light,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.primary.dark,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
  }),
  ...(day.day() === 0 && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(day.day() === 6 && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
})) as React.ComponentType<CustomPickerDayProps>;

const isInSameWeek = (dayA: Dayjs, dayB: Dayjs | null | undefined) => {
  if (dayB == null) {
    return false;
  }

  return dayA.isSame(dayB, 'week');
};

function Day(
  props: PickersDayProps & {
    selectedDay?: Dayjs | null;
    hoveredDay?: Dayjs | null;
  }
) {
  const { day, selectedDay, hoveredDay, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
    />
  );
}

export default function WeekPicker({
  queryWeek,
  setQueryWeek,
}: WeekPickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<Dayjs | null>(null);

  return (
    <div className="relative flex justify-end">
      <IconButton onClick={() => setShowCalendar(true)}>
        <CalendarTodayIcon />
      </IconButton>

      {showCalendar && (
        <ClickAwayListener onClickAway={() => setShowCalendar(false)}>
          <div className="absolute z-10 top-0 bg-[#141414] border">
            <DateCalendar
              value={queryWeek}
              onChange={(newDate) => {
                if (newDate) setQueryWeek(newDate);
                setShowCalendar(false);
              }}
              showDaysOutsideCurrentMonth
              slots={{ day: Day }}
              slotProps={{
                day: (ownerState) => ({
                  selectedDay: queryWeek,
                  hoveredDay,
                  onPointerEnter: () => setHoveredDay(ownerState.day),
                  onPointerLeave: () => setHoveredDay(null),
                }),
              }}
            />
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}

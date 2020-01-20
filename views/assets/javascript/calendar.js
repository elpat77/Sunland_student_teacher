$(document).ready(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var Calendar = FullCalendar.Calendar;
        var Draggable = FullCalendarInteraction.Draggable

        /* initialize the external events
        -----------------------------------------------------------------*/

        var containerEl = document.getElementById('external-events-list');
        var eventEls = Array.prototype.slice.call(
            containerEl.querySelectorAll('.fc-event')
        );
        eventEls.forEach(function (eventEl) {
            new Draggable(eventEl, {
                eventData: {
                    title: eventEl.innerText.trim(),

                },

            });
        });

        /* initialize the calendar
        -----------------------------------------------------------------*/

        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            plugins: ['bootstrap', 'interaction', 'dayGrid', 'timeGrid', 'list'],
            themeSystem: 'bootstrap',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',

            },
            footer: {
                center: 'addEventButton',
            },
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar
            drop: function (arg) {
                // is the "remove after drop" checkbox checked?
                if (document.getElementById('drop-remove').checked) {
                    // if so, remove the element from the "Draggable Events" list
                    arg.draggedEl.parentNode.removeChild(arg.draggedEl);
                }
            },
            eventClick: function (arg) {
                if (confirm('delete event?')) {
                    arg.event.remove()
                }
            },

            // eventClick: function (calEvent, jsEvent) {
            //     var title = prompt('Event Title:', calEvent.title, {
            //         buttons: {
            //             Ok: true,
            //             Cancel: false
            //         }
            //     });

            //     if (title) {
            //         calEvent.title = title;
            //         ('#calendar').fullCalendar('updateEvent', calEvent);
            //     }
            // },

            customButtons: {
                addEventButton: {
                    text: 'Add New Event',
                    click: function () {
                        var dateStr = prompt('Enter a date in YYYY-MM-DD format');
                        var date = new Date(dateStr + 'T00:00:00'); // will be in local time

                        if (!isNaN(date.valueOf())) { // valid?
                            calendar.addEvent({
                                title: "new event",
                                start: date,
                                allDay: true,
                                editable: true
                            });
                            alert('Event added. Now, update your database...');
                        } else {
                            alert('Invalid date.');
                        }
                    }
                }
            }

        });
        calendar.render();

    });
})
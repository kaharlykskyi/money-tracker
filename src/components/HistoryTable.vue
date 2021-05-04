<template>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Сумма</th>
                <th>Дата</th>
                <th>Категория</th>
                <th>Тип</th>
                <th>Открыть</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(record, idx) in records" :key="record.id">
                <td>{{ (idx + 1) + (page-1) * pageSize }}</td>
                <td>{{record.amount | currency('UAH')}}</td>
                <td>{{record.date | date('date')}}</td>
                <td>{{record.categoryName}}</td>
                <td>
                    <span class="white-text badge" :class="[record.typeClass]">{{record.typeText}}</span>
                </td>
                <td>
                    <button 
                        class="btn-small btn" 
                        @click.prevent="$router.push(`/detail/${record.id}`)"
                        v-tooltip="'Посмотреть детали'"
                    >
                        <i class="material-icons">open_in_new</i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'HistoryTable',
    props: {
        records: {
            type: Array,
            require: true
        },
        page: {
            type: Number
        },
        pageSize: {
            type: Number
        }
    }
}
</script>